Feature: ManagerFacilityReservation

     Scenario: User navigates to ManagerFacilityReservation
        Given I am a User loading ManagerFacilityReservation
        When I navigate to the ManagerFacilityReservation
        Then ManagerFacilityReservation will load with out errors
        Then Should load the facility ReservationList List
        Then should I am able to click on Facility Reservation List card
        Then should check componentDidMount