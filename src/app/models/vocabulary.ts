/**
 * Interface for answer from back-end after operations with word
 *
 * @export
 * @interface IWordActions
 */
export interface IWordActions {
  /**
   * The returned HTTP status from back-end
   *
   * @type {string}
   * @memberOf IWordActions
   */
  status: string;

  /**
   * The returned data from back-end
   *
   * @type {IVocabulary | Object}
   * @memberOf IWordActions
   */
  data?: IVocabulary | Object;
}

/**
 * Interface for vocabulary word
 *
 * @export
 * @interface IVocabulary
 */
export interface IVocabulary {
  /**
   * ID of vocabulary word
   *
   * @type {string}
   * @memberOf IVocabulary
   */
  _id?: string;

  /**
   * The english word of vocabulary
   *
   * @type {string}
   * @memberOf IVocabulary
   */
  englishWord: string;

  /**
   * Russian translation of english word
   *
   * @type {string}
   * @memberOf IVocabulary
   */
  translation: string;
}

/**
 * Interface for updated word after word operations
 *
 * @export
 * @interface IUpdatedWord
 */
export interface IUpdatedWord {
  /**
   * Word operation type
   *
   * @type {string}
   * @memberOf IUpdatedWord
   */
  type: string;

  /**
   * Word index number
   *
   * @type {number}
   * @memberOf IUpdatedWord
   */
  index?: number;

  /**
   * Action from back-end after word operations
   *
   * @type {IWordActions}
   * @memberOf IUpdatedWord
   */
  action: IWordActions;
}
