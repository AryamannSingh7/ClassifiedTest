Feature: DashboardGeneral

    Scenario: User navigates to DashboardGeneral
        Given I am a User loading DashboardGeneral
        When I navigate to the DashboardGeneral
        Then DashboardGeneral will load with out errors