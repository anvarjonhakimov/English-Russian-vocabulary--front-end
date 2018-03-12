import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { TestService } from '../services';

import { IWordsForTest } from '../models';

/**
 * Test component
 */
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {

  /**
   * Gets the option buttons container
   *
   * @type {ElementRef}
   * @memberOf TestComponent
   */
  @ViewChild('optionButtons') optionButtons: ElementRef;

  private unsubscribe: Subject<void> = new Subject<void>();

  private chosenAnswer = '';
  private currentChosenAnswerButton: HTMLButtonElement;

  /**
   * Current test word number
   *
   * @type {number}
   * @memberOf TestComponent
   */
  public wordNumber = 1;

  /**
   * Toggle for showing Test Description View before starting test
   *
   * @type {boolean}
   * @memberOf TestComponent
   */
  public beforeStartTest = true;

  /**
   * For checking is test started
   *
   * @type {boolean}
   * @memberOf TestComponent
   */
  public isTestStarted = false;

  /**
   * For checking is test finished
   *
   * @type {boolean}
   * @memberOf TestComponent
   */
  public isFinished = false;

  /**
   * Toggle for disabling next button
   *
   * @type {boolean}
   * @memberOf TestComponent
   */
  public isDisabled = true;

  /**
   * Array of words with options for test
   *
   * @type {Array}
   * @memberOf TestComponent
   */
  public wordsForTest: IWordsForTest[] = [];

  /**
   * Current english word in test
   *
   * @type {string}
   * @memberOf TestComponent
   */
  public englishWord = '';

  /**
   * Array of options for current english word in test
   *
   * @type {Array}
   * @memberOf TestComponent
   */
  public options: Array<string> = [];

  /**
   * User's test score
   *
   * @type {number}
   * @memberOf TestComponent
   */
  public testScore = 0;

  /**
   * Creates an instance of TestComponent
   *
   * @param {TestService} testService - injected test service
   * @param {Renderer2} renderer
   * @param {Router} router
   */
  constructor(private testService: TestService,
              private renderer: Renderer2,
              private router: Router) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
  }

  /**
   * OnDestroy lifecycle hook implementation
   */
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Gets array of words with options for test
   *
   * @returns {void}
   * @memberOf TestComponent
   */
  private getWordsForTest(): void {
    this.testService.getWordsForTest()
      .takeUntil(this.unsubscribe)
      .subscribe((res) => {
        if (res.status === 'OK') {
          this.beforeStartTest = false;
          this.isTestStarted = true;
          this.wordsForTest = <IWordsForTest[]>res.data;
          this.getWordWithOptions(this.wordsForTest);
        }
      });
  }

  /**
   * Prepares word with options for test
   *
   * @param {IWordsForTest[]} words
   * @returns {void}
   * @memberOf TestComponent
   */
  private getWordWithOptions(words: IWordsForTest[]): void {
    this.englishWord = words[this.wordNumber - 1].englishWord;
    this.options = words[this.wordNumber - 1].options;
  }

  /**
   * Sends test score to update user test result
   *
   * @param {number} testScore
   * @type {void}
   * @memberOf TestComponent
   */
  private finishTest(testScore: number): void {
    this.testService.testResult(testScore)
      .takeUntil(this.unsubscribe)
      .subscribe((res) => {
        if (res.status === 'OK') {
          console.log('test score updated');
        }
      }, (err) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.error.status);
        }
      });
  }

  /**
   * Handles the Start test button click
   *
   * @returns {void}
   * @memberOf TestComponent
   */
  public startTest(): void {
    this.getWordsForTest();
  }

  /**
   * Shows next word for test
   *
   * @returns {void}
   * @memberOf TestComponent
   */
  public nextWord(): void {
    this.renderer.removeClass(this.currentChosenAnswerButton, 'mat-primary');

    if (this.chosenAnswer) {
      if (this.wordsForTest[this.wordNumber - 1].rightAnswer === this.chosenAnswer) {
        this.testScore += 1;
      }
    }

    this.wordNumber += 1;

    if (this.wordNumber > 20) {
      this.isTestStarted = false;
      this.isFinished = true;
      this.finishTest(this.testScore);
    } else {
      this.isDisabled = true;
      this.options = [];
      this.getWordWithOptions(this.wordsForTest);
    }
  }

  /**
   * Gets the chosen answer in test
   *
   * @param {string} answer
   * @param {number} index
   * @returns {void}
   * @memberOf TestComponent
   */
  public chooseAnswer(answer: string, index: number): void {
    if (answer) {
      const options = Array.from(this.optionButtons.nativeElement.children);

      for (let i = 0; i < options.length; i++) {
        const option = <HTMLButtonElement>options[i];

        if (i === index) {
          this.currentChosenAnswerButton = option;
          this.renderer.addClass(option, 'mat-primary');
        } else {
          this.renderer.removeClass(option, 'mat-primary');
        }
      }

      this.isDisabled = false;
      this.chosenAnswer = answer;
    }
  }

  /**
   * Shows Test start page
   *
   * @returns {void}
   * @memberOf TestComponent
   */
  public openTestPage(): void {
    this.isFinished = false;
    this.isTestStarted = false;
    this.beforeStartTest = true;
    this.wordsForTest = [];
    this.wordNumber = 1;
    this.options = [];
    this.testScore = 0;
  }

  /**
   * Navigates to Words list
   *
   * @returns {void}
   * @memberOf TestComponent
   */
  public openHomePage(): void {
    this.router.navigate(['words-list']);
  }

}
