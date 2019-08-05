import { Loading, QSpinnerHourglass } from 'quasar'

export default {
    show (messageString) {

        // fully customizable
        Loading.show({
            spinner: QSpinnerHourglass,
            message: messageString,
            messageColor: 'black',
            spinnerColor: 'red'
        })

        //Loading.hide()
    },

    hide () {
        Loading.hide()
    }
}