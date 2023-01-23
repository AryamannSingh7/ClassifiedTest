Feature: CollectedVsDue

    Scenario: User navigates to CollectedVsDue
        Given I am a User loading CollectedVsDue
        When I navigate to the CollectedVsDue
        Then CollectedVsDue will load with out errors
        And Should load collected vs due amount data
        And Should load year list
        And Should change the year for filter by year
        And Should change the year for filter by quarter
        And Should change the year for filter by month