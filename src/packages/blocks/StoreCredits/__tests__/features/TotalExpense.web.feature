Feature: TotalExpense

    Scenario: User navigates to TotalExpense
        Given I am a User loading TotalExpense
        When I navigate to the TotalExpense
        Then TotalExpense will load with out errors
        Then Should load the total expense, unit wise, city wise and category wise expense