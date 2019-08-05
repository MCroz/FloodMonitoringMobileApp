import { Dialog } from 'quasar'

export default {
    showError (titleString ,messageString) {
        return Dialog.create({ 
            title: titleString,
            message: messageString,
            persistent: true
        })
    }
}