<template>
    <div>
        <p>
            {{ $t('main.welcome', {user: 'Rio'})}}
        </p>
        <p>
            {{ $tc('main.messages', 1)}}
        </p>
        <p>
            {{ $d(new Date(), 'short')}}
        </p>
        <p>
            {{ $n(10000, 'currency')}}
        </p>
    </div>
</template>