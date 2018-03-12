/**
 * Interface for answer from back-end after authentication operations
 *
 * @export
 * @interface IAuthActions
 */
export interface IAuthActions {
  /**
   * The returned HTTP status from back-end
   *
   * @type {string}
   * @memberOf IAuthActions
   */
  status: string;

  /**
   * The returned data from back-end
   *
   * @type {string | Object}
   * @memberOf IAuthActions
   */
  data?: string | Object;

  /**
   * Generated token
   *
   * @type {string}
   * @memberOf IAuthActions
   */
  token?: string;
}

/**
 * Interface for sending data to sign up user
 *
 * @export
 * @interface ISignUpData
 */
export interface ISignUpData {
  /**
   * User Email address
   *
   * @type {string}
   * @memberOf ISignUpData
   */
  email: string;

  /**
   * User username
   *
   * @type {string}
   * @memberOf ISignUpData
   */
  username: string;

  /**
   * User password
   *
   * @type {string}
   * @memberOf ISignUpData
   */
  password: string;

  /**
   * Current URL protocol and host
   *
   * @type {string}
   * @memberOf ISignUpData
   */
  origin: string;
}

/**
 * Interface for sending data to sign in user
 *
 * @export
 * @interface ISignInData
 */
export interface ISignInData {
  /**
   * User Email address
   *
   * @type {string}
   * @memberOf ISignInData
   */
  email: string;

  /**
   * User password
   *
   * @type {string}
   * @memberOf ISignInData
   */
  password: string;
}

/**
 * Interface for sending data to create recovery code
 *
 * @export
 * @interface IForgotPassword
 */
export interface IForgotPasswordData {
  /**
   * User Email address
   *
   * @type {string}
   * @memberOf IForgotPasswordData
   */
  email: string;

  /**
   * Current URL protocol and host
   *
   * @type {string}
   * @memberOf IForgotPasswordData
   */
  origin: string;
}
