'use strict';

import {window, QuickPickItem, QuickPickOptions} from 'vscode';
import Prompt from './prompt';
import EscapeException from '../utils/EscapeException';

export default class ListPrompt extends Prompt {

	constructor(question: any) {
		super(question);
	}

	public render() {
		const choices = this._question.choices.reduce((result, choice) => {
			result[choice.name || choice] = choice.value || choice;
			return result;
		}, {});

		const options: QuickPickOptions = {
			placeHolder: this._question.message,
			ignoreFocusOut: true
		};

		return window.showQuickPick(Object.keys(choices), options)
			.then(result => {
				if (result === undefined) {
					throw new EscapeException();
				}

				return choices[result];
			});
	}
}
