<template>
    <div>
        <ul>
            <li v-for="locale in locales" :key="locale" @click.prevent="switchLocale(locale)">
                {{locale}}
            </li>
        </ul>
    </div>
</template>
<script>
import { Trans } from '@/plugins/translation'

export default {
    computed: {
        supportedLocales () {
            return Trans.supportedLocales
        }
    },
    methods: {
        switchLocale(locale){
            if(this.$i18n.locale != locale){
                const to = this.$router.resolve({params: {locale}})
                return Trans.changeLocale(locale).then(() => {
                    this.$router.push(to.location)
                })
            }
        }
    },
    data: () => ({
        locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
    })
}
</script>