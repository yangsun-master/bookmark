import fs = require("fs");
import util = require("util");
import * as jwt from "jsonwebtoken";
import getConfig from "../config";
import GoogleAuth from "./googleAuth";
import TokenPayload from "./TokenPayload";
import User from "./user";

const readFileAsync = util.promisify(fs.readFile);

class Auth {
  private readonly googleAuth: GoogleAuth;
  private readonly algorithm = "RS256";
  private privateKey: Buffer | undefined;
  private publicKey: Buffer | undefined;

  constructor() {
    this.googleAuth = new GoogleAuth();
  }

  public async init(): Promise<void> {
    const config = getConfig();
    this.privateKey = await readFileAsync(config.authPrivateKeyPath);
    this.publicKey = await readFileAsync(config.authPublicKeyPath);
  }

  public async authenticate(idToken: string): Promise<string> {
    if (!this.privateKey) {
      throw new Error("not initialized");
    }

    const userId = await this.googleAuth.authenticate(idToken);
    const payload: TokenPayload = {
      sub: userId,
    };
    const accessToken = await this.signAsync(payload, this.privateKey, {
      algorithm: this.algorithm,
      expiresIn: "1h",
    });
    return accessToken;
  }

  public async authorize(accessToken: string): Promise<User> {
    if (!this.publicKey) {
      throw new Error("not initialized");
    }

    const payload = await this.verifyAsync(accessToken, this.publicKey, {
      algorithms: [this.algorithm],
    });
    const user = new User(payload.sub);
    return user;
  }

  private signAsync(
    // eslint-disable-next-line @typescript-eslint/ban-types
    payload: object,
    privateKey: jwt.Secret,
    options: jwt.SignOptions
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, privateKey, options, (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded);
        }
      });
    });
  }

  private verifyAsync(
    token: string,
    publicKey: jwt.Secret,
    options: jwt.VerifyOptions
  ): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, publicKey, options, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as TokenPayload);
        }
      });
    });
  }
}

export default Auth;
