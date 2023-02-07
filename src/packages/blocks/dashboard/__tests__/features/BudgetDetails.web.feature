Feature: BudgetDetails

    Scenario: User navigates to BudgetDetails
        Given I am a User loading BudgetDetails
        When I navigate to the BudgetDetails
        Then BudgetDetails will load with out errors