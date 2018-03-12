/**
 * Interface for answer from back-end after operations with user
 *
 * @export
 * @interface IUserActions
 */
export interface IUserActions {
  /**
   * The returned HTTP status from back-end
   *
   * @type {string}
   * @memberOf IUserActions
   */
  status: string;

  /**
   * The returned data from back-end
   *
   * @type {IUser | Object}
   * @memberOf IUserActions
   */
  data?: IUser | Object;
}

/**
 * Interface for user information
 *
 * @export
 * @interface IUser
 */
export interface IUser {
  /**
   * User email address
   *
   * @type {string}
   * @memberOf IUser
   */
  email: string;

  /**
   * User username
   *
   * @type {string}
   * @memberOf IUser
   */
  username: string;

  /**
   * User test score
   *
   * @type {string | number}
   * @memberOf IUser
   */
  testResult: string | number;
}
