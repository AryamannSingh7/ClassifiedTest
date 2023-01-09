Feature: SpentVsCollected

    Scenario: User navigates to SpentVsCollected
        Given I am a User loading SpentVsCollected
        When I navigate to the SpentVsCollected
        Then SpentVsCollected will load with out errors
        And Should load spent vs collected data
        And Should load year list
        And Should change the year for filter by year
        And Should change the year for filter by quarter
        And Should change the year for filter by month