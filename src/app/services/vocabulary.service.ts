import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import {
  IWordActions,
  IVocabulary,
  IUpdatedWord
} from '../models';
import { API_URL } from '../utils';

/**
 * Service for vocabulary operations
 */
@Injectable()
export class VocabularyService {

  /**
   * Updated word after word operations
   *
   * @type {Subject<IUpdatedWord>}
   * @memberOf VocabularyService
   */
  public updatedWord: Subject<IUpdatedWord> = new Subject<IUpdatedWord>();

  /**
   * Creates an instance of VocabularyService
   *
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Calls back-end api and loads words list
   *
   * @returns {Observable<IWordActions>}
   * @memberOf VocabularyService
   */
  public getWordsList(): Observable<IWordActions> {
    return this.http.get(`${API_URL}/vocabulary/words-list`)
      .map((res) => res as IWordActions);
  }

  /**
   * Calls back-end api to add new word to vocabulary
   *
   * @param {IVocabulary} word
   * @returns {Observable<IWordActions>}
   * @memberOf VocabularyService
   */
  public addWord(word: IVocabulary): Observable<IWordActions> {
    return this.http.post(`${API_URL}/vocabulary/add`, word)
      .map((res) => res as IWordActions);
  }

  /**
   * Calls back-end api to edit selected word in vocabulary
   *
   * @param {IVocabulary} word
   * @returns {Observable<IWordActions>}
   * @memberOf VocabularyService
   */
  public editWord(word: IVocabulary): Observable<IWordActions> {
    return this.http.put(`${API_URL}/vocabulary/edit`, word)
      .map((res) => res as IWordActions);
  }

  /**
   * Calls back-end api to delete selected word from vocabulary
   *
   * @param {string} wordId
   * @returns {Observable<IWordActions>}
   * @memberOf VocabularyService
   */
  public deleteWord(wordId: string): Observable<IWordActions> {
    return this.http.delete(`${API_URL}/vocabulary/delete/${wordId}`)
      .map((res) => res as IWordActions);
  }

}
