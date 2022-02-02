Feature: ExpenseTracking

    Scenario: User navigates to ExpenseTracking
        Given I am a User loading ExpenseTracking
        When I navigate to the ExpenseTracking
        Then ExpenseTracking will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors