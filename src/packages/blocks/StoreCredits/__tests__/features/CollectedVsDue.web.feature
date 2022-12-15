Feature: CollectedVsDue

    Scenario: User navigates to CollectedVsDue
        Given I am a User loading CollectedVsDue
        When I navigate to the CollectedVsDue
        Then CollectedVsDue will load with out errors