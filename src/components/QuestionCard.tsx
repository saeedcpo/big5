import React, { Component } from 'react'
import { Choice, Question } from '../types'
import { ChoiceButton } from './ChoiceButton'

interface Props {
  question: Question
  choices: Choice[]
  number: number
  totalNumber?: number
  onAnswer: (c: Choice) => void
}

export class QuestionCard extends Component<Props> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    if (['1', '2', '3', '4', '5'].includes(key)) {
      const index = parseInt(key) - 1;
      if (index < this.props.choices.length) {
        this.props.onAnswer(this.props.choices[index]);
      }
    }
  };

  render() {
    let choices = this.props.choices.map((choice, i) => (
      <ChoiceButton
        key={choice.score + '_' + i}
        choice={choice}
        onClick={this.props.onAnswer}
        keyboardShortcut={i + 1}
      />
    ))

    return (
      <div className="h-full">
        <div className="grid place-items-center md:p-10 md:w-2/3 m-auto">
          <div className="rounded-xl transform shadow-lg bg-gradient-to-r from-purple-500 to-indigo-300 -rotate-1 sm:-rotate-2 p-2">
            <div className="card rounded-xl sm:rounded-xl overflow-hidden flex p-8 transform rotate-1 sm:rotate-2">
              <div className="grid grid-cols-12">
                <div className="col-span-10 pb-10 text-2xl text-center">
                  <div className="card-body">{this.props.question.text}</div>
                </div>
                <div className="col-span-2 text-2xl text-right">
                  <span className="whitespace-nowrap"># {this.props.number}</span>
                  <br />
                  {this.props.totalNumber ? (
                    <sup className="text-sm whitespace-nowrap">
                      {' '}
                      of {this.props.totalNumber}
                    </sup>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="justify-end card-footer flex-col md:flex-row">
                {choices}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
