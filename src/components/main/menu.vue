<template>
    <div>
        <ul>
            <li>
                <router-link :to="$transRoute({name: 'Landing Page'})">
                    {{$t('menu.home')}}
                </router-link>
            </li>
            <li>
                <router-link :to="$transRoute({name: 'About'})">
                    {{$t('menu.about')}}
                </router-link>
            </li>
        </ul>
    </div>
</template>