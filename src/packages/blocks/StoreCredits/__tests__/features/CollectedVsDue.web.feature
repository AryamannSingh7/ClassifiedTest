Feature: CollectedVsDue

    Scenario: User navigates to CollectedVsDue
        Given I am a User loading CollectedVsDue
        When I navigate to the CollectedVsDue
        Then CollectedVsDue will load with out errors
        Then Should load collected vs due amount data
        Then Should load year list
        Then Should change the year for filter by year