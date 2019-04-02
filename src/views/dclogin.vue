<template>
    <!-- 用于dc登录使用 -->
    <div>
    </div>
</template>

<script>
    import {
        getURLParameters
    } from '@/libs/utils';
    import Service from '@/server/index';
    export default {
        components: {
        },
        data() {
            return {}
        },
        created() {
            const param = getURLParameters(window.location.href)
            if (sessionStorage.getItem("userZgh")) {
                this.$router.push({
                    name: "index"
                })
            } else {
                if (param.username) {
                    Service.isAuthenticated(param).then(({
                        data,
                        success
                    }) => {
                        if (success) {
                            this.$router.push({
                                name: "index"
                            })
                            sessionStorage.setItem("userZgh", data.zgh);
                            this.$store.commit('SET_USER', data.username)
                        } else {
                            // this.$router.push('/401')
                        }
                    })
                } else {
                    this.$router.push('/401')
                }
            }
        }
    }
</script>

<style scoped>

</style>