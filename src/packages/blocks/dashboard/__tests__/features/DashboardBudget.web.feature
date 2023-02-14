Feature: DashboardBudget

    Scenario: User navigates to DashboardBudget
        Given I am a User loading DashboardBudget
        When I navigate to the DashboardBudget
        Then DashboardBudget will load with out errors