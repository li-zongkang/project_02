$(function() {
    // 页面一加载就要调用load函数
    load();
    $('#title').keyup(function(e) {
        if (e.keyCode == 13) {
            if ($(this).val().trim() != '') {

                //从localStorage获取数据
                var local = getDate();

                local.push({
                    title: $(this).val(),
                    done: false
                });
                //保存数据至localStorage
                saveDate(local);
                load();

                $(this).val('');
            } else {
                alert('请输入操作')
            }
        }
    })

    $('ol,ul').on('click', 'a', function() {
        // 获取lostlocalStorage内容，
        var date = getDate();

        // 获取点击a的id索引
        var idx = $(this).attr('id')
            // 删除对应的索引下的lostlocalStorage内容
        date.splice(idx, 1);
        // 将删除后的数据保存至lostlocalStorage
        saveDate(date);
        // 重新加载页面
        load();

    })

    $('ol,ul').on('click', 'input', function() {
            var date = getDate();

            var index = $(this).siblings('a').attr('id');
            // 修改对应的li里面带的done的值
            date[index].done = $(this).prop('checked');
            // 先保存数据给变量
            var el = date[index];
            //再删除这个数据
            date.splice(index, 1);
            //再把这个数据添加给数组
            date.push(el);

            saveDate(date);

            load();
        })
        // 读取本地数据
    function getDate() {
        //返回的是一个数组
        var date = localStorage.getItem('todoList')
        if (date) { //如果本地有数据，就返回该数据  数据为JOSN字符串，需要转化
            return JSON.parse(date)
        } else { //如果本地没有数据，创建数据
            return []
        }
    }

    // 保存数据
    function saveDate(date) {
        localStorage.setItem('todoList', JSON.stringify(date))
    }

    // 加载数据
    function load() {
        // 先清空内容
        $('ol,ul').empty();
        // 获取lostlocalStorage内容，
        var date = getDate();
        //遍历date数组，创建内容
        $.each(date, function(index, ele) {

            if (ele.done) {
                $('ul').prepend(`<li>
                <input type="checkbox" checked>
                <p>${ele.title}</p>
                <a href="javascript:;" id = ${index}></a>
            </li>`)
            } else {
                $('ol').prepend(`<li>
                <input type="checkbox">
                <p>${ele.title}</p>
                <a href="javascript:;" id = ${index}></a>
            </li>`)
            }

        })

        $('#todocount').text($('ol li').length);
        $('#donecount').text($('ul li').length);
    }
})