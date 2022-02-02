const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/search/src/'),
resolveApp('../blocks/core/src/'),
resolveApp('../blocks/social-media-account-registration/src/'),
resolveApp('../blocks/social-media-account/src/'),
resolveApp('../blocks/email-account-login/src/'),
resolveApp('../blocks/email-account-registration/src/'),
resolveApp('../blocks/country-code-selector/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/social-media-account-login/src/'),
resolveApp('../blocks/pushnotifications/src/'),
resolveApp('../blocks/mobile-account-login/src/'),
resolveApp('../blocks/dashboard/src/'),
resolveApp('../blocks/contactus/src/'),
resolveApp('../blocks/interactivefaqs/src/'),
resolveApp('../blocks/invitefriends/src/'),
resolveApp('../blocks/user-profile-basic/src/'),
resolveApp('../blocks/analytics/src/'),
resolveApp('../blocks/videos/src/'),
resolveApp('../blocks/mobile-account-registration/src/'),
resolveApp('../blocks/multiplecurrencysupport/src/'),
resolveApp('../blocks/customisableusersubscriptions/src/'),
resolveApp('../blocks/customform/src/'),
resolveApp('../blocks/landingpage/src/'),
resolveApp('../blocks/location/src/'),
resolveApp('../blocks/maps/src/'),
resolveApp('../blocks/notifications/src/'),
resolveApp('../blocks/PricingEngine2/src/'),
resolveApp('../blocks/PhotoLibrary3/src/'),
resolveApp('../blocks/BulkUploading/src/'),
resolveApp('../blocks/FriendList/src/'),
resolveApp('../blocks/InvoiceBilling/src/'),
resolveApp('../blocks/LanguageOptions/src/'),
resolveApp('../blocks/RequestManagement/src/'),
resolveApp('../blocks/ReviewAndApproval/src/'),
resolveApp('../blocks/AdminConsole3/src/'),
resolveApp('../blocks/RolesPermissions2/src/'),
resolveApp('../blocks/Notes/src/'),
resolveApp('../blocks/FormApprovalWorkflow/src/'),
resolveApp('../blocks/Feedback/src/'),
resolveApp('../blocks/EmailNotifications/src/'),
resolveApp('../blocks/Polling/src/'),
resolveApp('../blocks/ExpenseTracking/src/'),
resolveApp('../blocks/StoreCredits/src/'),
resolveApp('../blocks/TaskAllocator/src/'),
resolveApp('../blocks/TaxCalculator/src/'),
resolveApp('../blocks/BroadcastMessage/src/'),
resolveApp('../blocks/BudgetingForecasting/src/'),
resolveApp('../blocks/Chat9/src/'),
resolveApp('../blocks/Chatbot6/src/'),
resolveApp('../blocks/ContentManagement/src/'),
resolveApp('../blocks/CollectTransactionFees/src/'),
resolveApp('../blocks/ContentFlag/src/'),
resolveApp('../blocks/LeadManagement/src/'),
resolveApp('../blocks/Settings5/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../../node_modules/react-native-calendars'),
  resolveApp('../../node_modules/react-native-swipe-gestures'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src')
]

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  )
  config.resolve.alias = {'react-native-maps': 'react-native-web-maps', 'react-native': 'react-native-web'};
  return config
}