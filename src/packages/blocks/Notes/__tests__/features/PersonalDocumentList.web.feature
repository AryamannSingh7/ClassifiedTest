Feature: PersonalDocumentList

    Scenario: User navigates to PersonalDocumentList
        Given I am a User loading PersonalDocumentList
        When I navigate to the PersonalDocumentList
        Then PersonalDocumentList will load with out errors
        Then Should load personal document list
        Then Should open the add personal document dialog
        Then Should close the add personal document dialog by click on outside
        Then Should close the add personal document dialog by click on close icon
        Then Should close the add personal document dialog by click on cancel icon
        Then Should able to add file name
        Then Should able to remove uploaded file
        Then Should create the personal document when click on submit button
        Then Should close the delete dialog button when click on close icon
        Then Should close the delete dialog button when click on cancel icon
        Then Should delete the document