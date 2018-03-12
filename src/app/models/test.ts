/**
 * Interface for answer from back-end after test operations
 *
 * @export
 * @interface ITestActions
 */
export interface ITestActions {
  /**
   * The returned HTTP status from back-end
   *
   * @type {string}
   * @memberOf ITestActions
   */
  status: string;

  /**
   * The returned data from back-end
   *
   * @type {IWordsForTest | Object}
   * @memberOf ITestActions
   */
  data: IWordsForTest | Object;
}

/**
 * Interface for words with options for passing test
 *
 * @export
 * @interface IWordsForTest
 */
export interface IWordsForTest {
  /**
   * The english word to guess the translation
   *
   * @type {string}
   * @memberOf IWordsForTest
   */
  englishWord: string;

  /**
   * Options (translations) for english word
   *
   * @type {[string]}
   * @memberOf IWordsForTest
   */
  options: [string];

  /**
   * The right translation for english word
   *
   * @type {string}
   * @memberOf IWordsForTest
   */
  rightAnswer: string;
}
