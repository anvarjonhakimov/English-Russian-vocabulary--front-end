import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { DialogComponent } from '../dialog/dialog.component';

import { VocabularyService, AuthService } from '../services';

import { IUpdatedWord, IVocabulary } from '../models';

/**
 * Vocabulary list component
 */
@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss']
})
export class VocabularyListComponent implements OnInit, OnDestroy {

  /**
   * Gets the words list container
   *
   * @type {ElementRef}
   * @memberOf VocabularyListComponent
   */
  @ViewChild('wordsListContainer') wordsListContainer: ElementRef;

  private unSubscribe$: Subject<void> = new Subject<void>();
  private timeOutId: any;

  /**
   * List of words with translations
   *
   * @type {Array}
   * @memberOf VocabularyListComponent
   */
  public wordsList: IVocabulary[] = [];

  /**
   * Creates an instance of VocabularyListComponent
   *
   * @param {VocabularyService} vocabularyService - injected vocabulary service
   * @param {AuthService} authService - injected auth service
   * @param {Router} router
   * @param {MatDialog} dialog
   */
  constructor(private vocabularyService: VocabularyService,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.getWordsList();
    this.updateWordsList();
  }

  /**
   * OnDestroy lifecycle hook implementation
   */
  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
    clearTimeout(this.timeOutId);
  }

  /**
   * Checks if user is logged in
   *
   * @returns {boolean}
   * @memberOf VocabularyListComponent
   */
  private isLoggedIn(): boolean {
    let isLoggedIn = false;

    this.authService.isLoggedIn
      .takeUntil(this.unSubscribe$)
      .subscribe((res: boolean) => {
        isLoggedIn = res;
      });

    return isLoggedIn;
  }

  /**
   * Gets words list with options
   *
   * @returns {void}
   * @memberOf VocabularyListComponent
   */
  private getWordsList(): void {
    if (this.isLoggedIn()) {
      this.vocabularyService.getWordsList()
        .takeUntil(this.unSubscribe$)
        .subscribe(res => {
          if (res.status === 'OK') {
            this.wordsList = <IVocabulary[]>res.data;
          }
        }, (err) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err.error.status);
          }
        });
    }
  }

  /**
   * Updates words list after word operations
   *
   * @returns {void}
   * @memberOf VocabularyListComponent
   */
  private updateWordsList(): void {
    this.vocabularyService.updatedWord
      .takeUntil(this.unSubscribe$)
      .subscribe((res: IUpdatedWord) => {
        const type = res.type;
        const index = res.index;
        const status = res.action.status;
        const actionsData = <IVocabulary>res.action.data;

        if (status === 'OK') {
          switch (type) {
            case 'add': {
              this.wordsList.push(actionsData);
              this.timeOutId = setTimeout(() => {
                this.wordsListContainer.nativeElement.scrollTop = this.wordsListContainer.nativeElement.scrollHeight;
              });
              break;
            }
            case 'edit': {
              this.wordsList[index] = actionsData;
              break;
            }
            case 'delete': {
              this.wordsList.splice(index, 1);
            }
          }
        }
      }, (err) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.error.status);
        }
      });
  }

  /**
   * Opens Add Word dialog
   *
   * @returns {void}
   * @memberOf VocabularyListComponent
   */
  public openAddDialog(): void {
    const dialogData = {
      id: this.wordsList.length + 1,
      type: 'add'
    };

    this.dialog.open(DialogComponent, {
      width: '300px',
      height: 'auto',
      data: dialogData
    });
  }

  /**
   * Opens Edit Word dialog
   *
   * @param {number} index
   * @returns {void}
   * @memberOf VocabularyListComponent
   */
  public openEditDialog(index: number): void {
    const dialogData = {
      id: this.wordsList[index]._id,
      englishWord: this.wordsList[index].englishWord,
      translation: this.wordsList[index].translation,
      type: 'edit',
      index: index
    };

    this.dialog.open(DialogComponent, {
      width: '300px',
      height: 'auto',
      data: dialogData
    });
  }

  /**
   * Opens Delete Word dialog
   *
   * @param {number} index
   * @returns {void}
   * @memberOf VocabularyListComponent
   */
  public openDeleteDialog(index: number): void {
    const dialogData = {
      id: this.wordsList[index]._id,
      englishWord: this.wordsList[index].englishWord,
      translation: this.wordsList[index].translation,
      type: 'delete',
      index: index
    };

    this.dialog.open(DialogComponent, {
      data: dialogData
    });
  }

  /**
   * Navigates to Test page
   *
   * @returns {void}
   * @memberOf VocabularyListComponent
   */
  public openTest(): void {
    this.router.navigate(['/test']);
  }

}
