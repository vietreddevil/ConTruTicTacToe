<template>
	<div id="header" class="container">
		<a class="btn btn-success" href="/congtru">Game cộng trừ</a>
		<a href="/tictac" class="btn btn-primary">Game tictactoe</a>
	</div>
</template>
<style>
#header {
	/*display: flex;*/
	font-size: 40px;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	margin-left: 30%;
}
a {
	font-weight: bold;
	margin-top: 20%;
	margin-left: 50px;
	color: white;
	width: 150px;
	height: 40px;
}
a:hover {
	width: 250px;
	height: 80px;
}
</style>