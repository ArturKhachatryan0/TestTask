import jwt from "jsonwebtoken";
import { JWT } from "../config/index.js";
import redisClient from "../redis/index.js";

/**
 * @description - Create JWT access token
 * @param payload {Object} - Token payload
 */
const generateAccessToken = (payload) => {
  return "Bearer " + jwt.sign(payload, JWT.ACCESS_TOKEN.SECRET, { expiresIn: JWT.ACCESS_TOKEN.EXPIRES_IN });
};

/**
 * @description - Create JWT refresh token
 * @param payload {Object} - Token payload
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT.REFRESH_TOKEN.SECRET, { expiresIn: JWT.REFRESH_TOKEN.EXPIRES_IN });
};

/**
 * @description - JWT token decoder
 * @param token {String} - JWT token for decoding
 * @param options {Object} - Token decoding options such as ignoring expiration date, etc.
 * @param secret {String} - Secret via which the token was created
 * @returns {{payload: any, error: Object}} - Return payload if token is valid, otherwise return error object
 */
const decodeToken = (token, options = {}, secret) => {
  const result = {
    payload: null,
    error: null,
  };

  try {
    result.payload = jwt.verify(token, secret, options);
  } catch (error) {
    result.error = error;
  } finally {
    return result;
  }
};

/**
 * @description - Decode access token
 * @param token - JWT token for decoding
 * @param options {Object} - Token decoding options such as ignoring expiration date, etc.
 * @returns {{payload: any, error: Object}} - Return payload if token is valid, otherwise return error object
 */
const decodeAccessToken = (token, options = {}) => {
  return decodeToken(token, options, JWT.ACCESS_TOKEN.SECRET);
};

/**
 * @description - Decode refresh token
 * @param token - JWT token for decoding
 * @param options {Object} - Token decoding options such as ignoring expiration date, etc.
 * @returns {{payload: any, error: Object}} - Return payload if token is valid, otherwise return error object
 */
const decodeRefreshToken = (token, options = {}) => {
  return decodeToken(token, options, JWT.REFRESH_TOKEN.SECRET);
};

const addTokenToBlackList = async (token, expiresIn) => {
  return await redisClient.set(token, "blacklisted", {
    EX: expiresIn,
    NX: true,
  });
};

const isInBlackList = async (token) => {
  const value = await redisClient.get(token);
  return Boolean(value);
};

export default {
  generateAccessToken,
  generateRefreshToken,
  decodeAccessToken,
  decodeRefreshToken,
  addTokenToBlackList,
  isInBlackList,
};
