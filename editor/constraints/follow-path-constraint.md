约束 (Constraints)

# 路径跟随约束 (Follow Path Constraint)

路径跟随约束通过将对象约束到一条路径上，大大简化了复杂运动轨迹的创建。

## [​](#setting-up-a-follow-path-constraint) 设置路径跟随约束

1. 首先，你需要一个要约束的对象和一条用作路径的曲线。
2. 选中对象，添加新约束并选择 **Follow Path Constraint**。
![添加路径跟随约束](images/image_0.png)
3. 点击 Target 按钮，选择你希望对象跟随的路径。

## [​](#follow-path-properties) 路径跟随属性

与其他约束类似，路径跟随约束有多个可自定义的属性。

#### [​](#strength) 强度 (Strength)
控制受约束对象对路径的遵循程度。

#### [​](#target) 目标 (Target)
指定要跟随的路径对象。

#### [​](#distance) 距离 (Distance)
该属性控制对象沿路径移动的位置。百分比增加时，对象沿路径前进。*注意：该值可以超过 100%。*
![距离属性效果](images/image_1.png)

#### [​](#orient) 朝向 (Orient)
控制受约束对象的旋转方式。
- **开启**：对象的旋转会自动跟随路径的切线方向。此时无法手动调整对象旋转。
![朝向开启效果](images/image_2.png)
- **关闭**：对象旋转不受路径影响，你可以手动设置任意旋转角度。

#### [​](#offset) 偏移 (Offset)
允许对象沿路径移动，但保持其当前位置作为偏移起点。

[位移约束 (Translation Constraint)](/editor/constraints/translation-constraint.md)[滚动约束 (Scroll Constraints)](/editor/constraints/scroll-constraint.md)