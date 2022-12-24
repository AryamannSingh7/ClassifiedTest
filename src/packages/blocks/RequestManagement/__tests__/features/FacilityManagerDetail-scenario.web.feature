Feature: FacilityManagerDetail

     Scenario: User navigates to FacilityManagerDetail
        Given I am a User loading FacilityManagerDetail
        When I navigate to the FacilityManagerDetail
        Then FacilityManagerDetail will load with out errors
        Then I can go back to Facility details page