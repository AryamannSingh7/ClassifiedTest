Feature: MyExpenseList

    Scenario: User navigates to MyExpenseList
        Given I am a User loading MyExpenseList
        When I navigate to the MyExpenseList
        Then MyExpenseList will load with out errors
        And Should open filter dialog when click on filter button
        And Should close filter dialog when click on close button
        And Should open accordion open and close