<template>
	<div class="container">
		<div class="content">
<!--				<div class="header">-->
<!--					<h1>로컬 메모장</h1>-->
<!--					<input type="text" placeholder="내용을 입력해주세요." v-model="newTodo">-->
<!--					<button @click="addTodo">메모하기</button>-->
<!--				</div>-->
<!--			<div class="local">-->
<!--				<ul>-->
<!--					<li v-for="item in toDos" :key="item.id">{{ item.content }}-->
<!--						<button @click="removeTodo(item.id)">삭제하기</button>-->
<!--						<button @click="tempUpdateTodo(item.id)">수정하기</button>-->
<!--					</li>-->
<!--				</ul>-->
<!--				<span>-->
<!--      	  <input type="text" ref="modiFocus" v-model="modiTodo" placeholder="내용 수정">-->
<!--      	  <button @click="updateTodo">확인</button>-->
<!--      	</span>-->
<!--			</div>-->

				<h1>Ajax 메모장</h1>
				<div>
					<input type="text" ref="inputFocus" placeholder="내용을 입력해주세요." v-model="newAjaxTodo" maxlength="15">
					<button @click="addAjaxTodo">메모하기</button>
				</div>
				<ul>
					<li v-for="ajaxTodo in ajaxTodos" :key="ajaxTodo.todoNo">

						<span>글쓴이: {{ ajaxTodo.name }}</span>
						<span></span>
						 | {{ ajaxTodo.contents }} | 입력시간: {{ ajaxTodo.insertTime }} | 수정시간:
						{{ ajaxTodo.updateTime }}

						<button @click="removeAjaxTodo(ajaxTodo.todoNo)">삭제하기</button>
						<button @click="transUpdateAjaxTodo(ajaxTodo.todoNo)">수정하기</button>
					</li>
				</ul>
			<br>

			<span>
        <input type="text" placeholder="내용 수정" maxlength="15" v-model="modiAjaxTodo" ref="modiAjaxFocus">
        <button @click="updateAjaxTodo">확인</button>
      </span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			memberNo: '1',
			newTodo: '',
			toDos: [],
			modiTodo: '',
			tempId: '',
			ajaxTodos: [],
			newAjaxTodo: '',
			ajaxUpdateId: '',
			modiAjaxTodo: ''
		}
	},
	methods: {
		addTodo() {
			if (this.newTodo !== '') {
				let oldData = JSON.parse(localStorage['todo'])
				const data = {'id': Date.now(), 'content': this.newTodo}
				oldData.push(data)
				this.toDos.push(data)
				localStorage.setItem('todo', JSON.stringify(oldData))
				this.newTodo = ''
			} else {
				alert('내용을 입력하세요')
			}
		},
		removeTodo(id) {
			let oldData = JSON.parse(localStorage['todo'])
			let step = 0
			for (step = 0; oldData.length > step; step++) {
				if (oldData[step]['id'] === id) {
					this.toDos.splice(step, 1)
					oldData = this.toDos
					localStorage.setItem('todo', JSON.stringify(oldData))
				}
			}
		},
	
		tempUpdateTodo(id) {
			this.$refs.modiFocus.focus()
			this.tempId = id
		},
		transUpdateAjaxTodo(id) {
			this.$refs.modiAjaxFocus.focus()
			this.ajaxUpdateId = id
		},
		updateTodo() {
			if (this.tempId !== '') {
				let oldData = JSON.parse(localStorage['todo'])
				let step = 0
				for (step = 0; oldData.length > step; step++) {
					if (oldData[step]['id'] === this.tempId) {
						oldData[step]['content'] = this.modiTodo
						localStorage.setItem('todo', JSON.stringify(oldData))
						window.location.reload()
					}
				}
			} else {
				alert('수정할 메모를 선택해주세요!')
			}
		},
		
	},
	mounted() {
		this.$refs.inputFocus.focus()
	}
	,
	created() {
		if (localStorage.getItem('todo') === null) {
			localStorage['todo'] = JSON.stringify([{'id': Date.now(), 'content': '메모를 시작하세요'}])
		}
		for (let todo of JSON.parse(localStorage['todo'])) {
			this.toDos.push(todo)
		}
	}
	,
	beforeMount() {
		this.fetchData();
	}
}
</script>

<style>
.header {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 100px;
	font-size: 30px;
	/* 어떤 높이든 가운데 정렬해준다*/
	align-items: center;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
<!--// TODO
	1. 삭제라는 개념이 없다. 삭제 => 비활성화 => isValid = 'N'
	2. 불러 올때는 isValid = 'Y'
	3. 삭제 추가 기능인데, 체크박스를 각 리스트에 만들어서, 체크된 값을 전체를 비활성화하한다

-->
