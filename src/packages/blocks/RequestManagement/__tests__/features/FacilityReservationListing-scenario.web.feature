Feature: FacilityReservationListing

     Scenario: User navigates to FacilityReservationListing
        Given I am a User loading FacilityReservationListing
        When I navigate to the FacilityReservationListing
        Then FacilityReservationListing will load with out errors
        Then I can go back to Facility details page