Feature: UnitExpenseList

    Scenario: User navigates to UnitExpenseList
        Given I am a User loading UnitExpenseList
        When I navigate to the UnitExpenseList
        Then UnitExpenseList will load with out errors
        And Should open filter dialog when click on filter button
        And Should close filter dialog when click on close button
        And Should open accordion open and close