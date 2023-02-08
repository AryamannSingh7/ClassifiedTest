Feature: ResidentDashboard

    Scenario: User navigates to ResidentDashboard
        Given I am a User loading ResidentDashboard
        When I navigate to the ResidentDashboard
        Then ResidentDashboard will load with out errors