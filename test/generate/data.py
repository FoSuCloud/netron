import onnx
from onnx import TensorProto, helper

# 创建一个示例ONNX模型
model = onnx.ModelProto()
model.graph.name = "SampleModel"

# 创建一个输入张量
input_name = "input"
input_shape = [1, 3, 224, 224]  # 示例输入形状
model.graph.input.extend([helper.make_tensor_value_info(input_name, TensorProto.FLOAT, input_shape)])

# 创建一个输出张量
output_name = "output"
output_shape = [1, 1000]  # 示例输出形状
model.graph.output.extend([helper.make_tensor_value_info(output_name, TensorProto.FLOAT, output_shape)])

# 将自定义元数据添加到模型的文档字符串中
model.doc_string = "This is a 张三 sample ONNX 李四 model with custom metadata.\nAuthor: John Doe\nVersion: 1.0"

# 保存带有自定义元数据的ONNX模型
onnx_file_path = "../../third_party/test/onnx/sample_model_with_metadata.onnx"
onnx.save(model, onnx_file_path)

print(f"带有自定义元数据的ONNX模型已生成并保存到{onnx_file_path}")
