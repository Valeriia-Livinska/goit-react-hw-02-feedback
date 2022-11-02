import React, { Component } from 'react';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onHandleClick = e => {
    this.setState(prevState => {
      return {
        [e.target.name]: prevState[e.target.name] + 1,
      };
    });
  };

  countTotalFeedback = () => { 
    const stateValues = Object.values(this.state);
    const total = stateValues.reduce((previousValue, number) => {
      return previousValue + number;
    }, 0);
    return total;
  }

  countPositiveFeedbackPercentage = () => { 
    const total = this.state.good + this.state.neutral + this.state.bad;
    const positiveFeedbackPercentage = Math.ceil(this.state.good * 100 / total);
    
    return positiveFeedbackPercentage;
  }

  render() {
    const buttonsName = Object.keys(this.state);
    const { good, neutral, bad } = this.state;

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={buttonsName}
            onLeaveFeedback={this.onHandleClick}
          ></FeedbackOptions>
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() >= 1 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
          ) : (
            <Notification message="There is no feedback"></Notification>
          )}
        </Section>
      </>
    );
  }
}

export default App;
