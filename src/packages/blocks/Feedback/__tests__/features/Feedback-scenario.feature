Feature: Feedback

    Scenario: User navigates to Feedback
        Given I am a User loading Feedback
        When I navigate to the Feedback
        Then Feedback will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors