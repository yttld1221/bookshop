<template>
	<div class="backTo">
		<span class="back" v-on:click="back"><img src="../../../static/image/back.png" alt=""></span>
	</div>
</template>

<script>
	export default {
		methods: {
			back() {
				this.$router.push({
					name: 'Home'
				}) 
			},
		},
	}
</script>
<style lang="scss" scoped>
	@import '../../style/base.scss';

	.back {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		@include wh(2rem, 2rem);

		img {
			@include wh(100%, 100%);
		}
	}
</style>
