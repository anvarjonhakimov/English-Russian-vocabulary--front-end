import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { VocabularyService } from '../services';
import {
  IVocabulary,
  IWordActions
} from '../models';

/**
 * Dialog component
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  /**
   * Dialog form group
   *
   * @type {FormGroup}
   * @memberOf DialogComponent
   */
  public dialogForm: FormGroup;

  /**
   * Creates an instance of DialogComponent
   *
   * @param {any} data - dialog data
   * @param {VocabularyService} vocabularyService - injected vocabulary service
   * @param {FormBuilder} formBuilder
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private vocabularyService: VocabularyService,
              private formBuilder: FormBuilder) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.initFormGroup();
  }

  /**
   * Form Group initialization
   *
   * @returns {void}
   * @memberOf DialogComponent
   */
  private initFormGroup(): void {
    const englishWord = this.data.englishWord;
    const translation = this.data.translation;

    this.dialogForm = this.formBuilder.group({
      englishWord: [englishWord, [Validators.required, Validators.minLength(1)]],
      translation: [translation, [Validators.required, Validators.minLength(1)]]
    });
  }

  /**
   * Handles Add button click
   *
   * @returns {void}
   * @memberOf DialogComponent
   */
  public addWord(): void {
    if (this.dialogForm.valid) {
      const newWord: IVocabulary = this.dialogForm.value;

      this.vocabularyService.addWord(newWord)
        .subscribe((addedWord: IWordActions) => {
          const addedWordData = {
            type: 'add',
            action: addedWord
          };

          this.vocabularyService.updatedWord.next(addedWordData);
        });
    }
  }

  /**
   * Handles Edit button click
   *
   * @returns {void}
   * @memberOf DialogComponent
   */
  public editWord(): void {
    if (this.dialogForm.valid) {
      const editingWord: IVocabulary = this.dialogForm.value,
            index = this.data.index;

      editingWord._id = this.data.id;

      this.vocabularyService.editWord(editingWord)
        .subscribe((editedWord: IWordActions) => {
          editedWord.data = editingWord;

          const updatedWordData = {
            type: 'edit',
            index: index,
            action: editedWord
          };

          this.vocabularyService.updatedWord.next(updatedWordData);
        });
    }
  }

  /**
   * Handles Delete button click
   *
   * @returns {void}
   * @memberOf DialogComponent
   */
  public deleteWord(): void {
    const wordId = this.data.id,
          index = this.data.index;

    this.vocabularyService.deleteWord(wordId)
      .subscribe((deletedWord: IWordActions) => {
        const deletedWordData = {
          type: 'delete',
          index: index,
          action: deletedWord
        };

        this.vocabularyService.updatedWord.next(deletedWordData);
      });
  }

}
