<template>
	<nav>
		<div class="loading" id="loading">
			<img src="../../../static/image/loading.gif" alt="">
			<div class="progress" id="progress">0%</div>
		</div>
	</nav>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		mounted() {
			var $loading = $('#loading')
			var $progress = $('#progress')
			var prg = 0
			var timer = 0
			progress([80, 90], [1, 3], 100) // 使用数组来表示随机数的区间
			window.onload = () => {
				progress(100, [1, 5], 10, () => {
					window.setTimeout(() => { // 延迟了一秒再隐藏loading
						$loading.hide()
					}, 100)
				})
			}
			window.setTimeout(() => { // 设置5秒的超时时间
				progress(100, [1, 5], 10, () => {
					window.setTimeout(() => { // 延迟了一秒再隐藏loading
						$loading.hide()
					}, 100)
				})
			}, 500)

			function progress(dist, speed, delay, callback) {
				var _dist = random(dist)
				var _delay = random(delay)
				var _speed = random(speed)
				window.clearTimeout(timer)
				timer = window.setTimeout(() => {
					if (prg + _speed >= _dist) {
						window.clearTimeout(timer)
						prg = _dist
						callback && callback()
					} else {
						prg += _speed
						progress(_dist, speed, delay, callback)
					}
					$progress.html(parseInt(prg) + '%') // 留意，由于已经不是自增1，所以这里要取整
				}, _delay)
			}

			function random(n) {
				if (typeof n === 'object') {
					var times = n[1] - n[0]
					var offset = n[0]
					return Math.random() * times + offset
				} else {
					return n
				}
			}
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	nav{
		.loading {
			background-color: white !important;
			opacity: 0.3;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			// background-color: #fff;
			z-index:4;
			img{
				width: 30%;
			}
		}
		
		.loading .progress {
			color: black !important;
			height:10%;
			display: flex;
			align-items: center;
			font-size: 3rem;
			background-color: transparent;
			border: 1px solid transparent !important;
			text-align: center;
		}
	}
</style>
