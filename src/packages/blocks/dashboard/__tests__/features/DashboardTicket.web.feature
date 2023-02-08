Feature: DashboardTicket

    Scenario: User navigates to DashboardTicket
        Given I am a User loading DashboardTicket
        When I navigate to the DashboardTicket
        Then DashboardTicket will load with out errors