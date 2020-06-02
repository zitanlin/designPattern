### 问题

##### 一、antd报错
> 按照官网引入 antd，使用报错：`antd is not defined`

因为 antd 内部依赖 moment.js，因此需要额外引入 moment.js。`<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>`

##### 二、antd使用完整标签
> 通过 import 引入 antd 时, 可以 `const { Option } = Select;` 然后直接使用 `<Option></Option>` 但是通过 script 引入没办法向上述方式使用。只能使用完整标签。例如：`antd.Select.Option`，否则会报错


