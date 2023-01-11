Feature: TotalExpense

    Scenario: User navigates to TotalExpense
        Given I am a User loading TotalExpense
        When I navigate to the TotalExpense
        Then TotalExpense will load with out errors
        And Should load the total expense, unit wise, city wise and category wise expense
        And Should load year list
        And Should change the year for filter by year
        And Should change the year for filter by quarter
        And Should change the year for filter by month