Feature: ExpenseDetail

    Scenario: User navigates to ExpenseDetail
        Given I am a User loading ExpenseDetail
        When I navigate to the ExpenseDetail
        Then ExpenseDetail will load with out errors
        And I can go back to expense details page
        And Should open delete dialog when click on delete button
        And Should close delete dialog when click on close button