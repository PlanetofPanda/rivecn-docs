import { defineConfig } from 'vitepress'

export default defineConfig({
      title: 'Rive 中文文档',
      description: 'Rive 官方文档中文版',

      // 基础路径，适配生产环境
      base: '/docs/',

      // 开启简洁 URL
      cleanUrls: true,

      // 语言设置
      lang: 'zh-CN',

      // 忽略死链
      ignoreDeadLinks: true,

      // 主题配置
      themeConfig: {
            logo: '/logo/rive_top_logo_black.svg',

            // 导航栏
            nav: [
                  {
                        text: "首页",
                        link: "/getting-started/introduction.md"
                  },
                  {
                        text: "编辑器",
                        link: "/editor/interface-overview/overview.md"
                  },
                  {
                        text: "脚本",
                        link: "/scripting/getting-started.md"
                  },
                  {
                        text: "应用运行时",
                        link: "/runtimes/getting-started.md"
                  },
                  {
                        text: "游戏运行时",
                        link: "/game-runtimes/unreal/unreal.md"
                  },
                  {
                        text: "功能支持",
                        link: "/"
                  },
                  {
                        text: "教程",
                        link: "/tutorials/learn-rive.md"
                  }
            ],

            // 侧边栏
            sidebar: {
                  "/getting-started/": [
                        {
                              text: "快速入门",
                              items: [
                                    {
                                          text: "简介",
                                          link: "/getting-started/introduction.md"
                                    },
                                    {
                                          text: "最佳实践",
                                          link: "/getting-started/best-practices.md"
                                    },
                                    {
                                          text: "快速链接",
                                          link: "/getting-started/quick-links.md"
                                    }
                              ],
                              collapsed: false
                        },
                        {
                              text: "社区",
                              items: [
                                    {
                                          text: "社区概览",
                                          link: "/community/community-overview.md"
                                    },
                                    {
                                          text: "市场概览",
                                          link: "/community/marketplace-overview.md"
                                    },
                                    {
                                          text: "Rive 专家",
                                          link: "/community/rive-experts.md"
                                    }
                              ],
                              collapsed: false
                        },
                        {
                              text: "账户管理",
                              items: [
                                    {
                                          text: "账户概览",
                                          items: [
                                                {
                                                      text: "账户概览",
                                                      link: "/account-admin/account-overview/account-overview.md"
                                                },
                                                {
                                                      text: "创建账户",
                                                      link: "/account-admin/account-overview/creating-an-account.md"
                                                },
                                                {
                                                      text: "账户管理",
                                                      link: "/account-admin/account-overview/account-management.md"
                                                },
                                                {
                                                      text: "取消账户",
                                                      link: "/account-admin/account-overview/cancel-my-account.md"
                                                },
                                                {
                                                      text: "删除账户",
                                                      link: "/account-admin/account-overview/delete-my-account.md"
                                                },
                                                {
                                                      text: "登录故障排除",
                                                      link: "/account-admin/account-overview/trouble-logging-in.md"
                                                },
                                                {
                                                      text: "账单变更",
                                                      link: "/account-admin/account-overview/billing-changes.md"
                                                },
                                                {
                                                      text: "下载收据或发票",
                                                      link: "/account-admin/account-overview/downloading-my-receipt-or-invoice.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "工作空间",
                                          items: [
                                                {
                                                      text: "工作空间概览",
                                                      link: "/account-admin/workspaces/workspaces-overview.md"
                                                },
                                                {
                                                      text: "创建工作空间",
                                                      link: "/account-admin/workspaces/creating-a-workspace.md"
                                                },
                                                {
                                                      text: "邀请工作空间成员",
                                                      link: "/account-admin/workspaces/inviting-workspace-members.md"
                                                },
                                                {
                                                      text: "移除工作空间成员",
                                                      link: "/account-admin/workspaces/removing-workspace-members.md"
                                                },
                                                {
                                                      text: "重新激活已取消的工作空间",
                                                      link: "/account-admin/workspaces/reactivating-a-canceled-workspace.md"
                                                },
                                                {
                                                      text: "工作空间常见问题",
                                                      link: "/account-admin/workspaces/workspace-faqs.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "价格",
                                          link: "/account-admin/pricing.md"
                                    },
                                    {
                                          text: "使用自有存储桶",
                                          link: "/account-admin/bring-your-own-bucket.md"
                                    }
                              ],
                              collapsed: false
                        },
                        {
                              text: "法律信息",
                              items: [
                                    {
                                          text: "服务条款",
                                          link: "/legal/terms-of-service.md"
                                    },
                                    {
                                          text: "可接受使用政策",
                                          link: "/legal/acceptable-use-policy.md"
                                    },
                                    {
                                          text: "隐私政策",
                                          link: "/legal/privacy-policy.md"
                                    }
                              ],
                              collapsed: false
                        }
                  ],
                  "/editor/": [
                        {
                              text: "编辑器",
                              items: [
                                    {
                                          text: "界面概览",
                                          items: [
                                                {
                                                      text: "概览",
                                                      link: "/editor/interface-overview/overview.md"
                                                },
                                                {
                                                      text: "工具栏",
                                                      link: "/editor/interface-overview/toolbar.md"
                                                },
                                                {
                                                      text: "层级",
                                                      link: "/editor/interface-overview/hierarchy.md"
                                                },
                                                {
                                                      text: "检查器",
                                                      link: "/editor/interface-overview/inspector.md"
                                                },
                                                {
                                                      text: "舞台",
                                                      link: "/editor/interface-overview/stage.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "基础知识",
                                          items: [
                                                {
                                                      text: "概览",
                                                      link: "/editor/fundamentals/overview.md"
                                                },
                                                {
                                                      text: "设计 与 动画 模式",
                                                      link: "/editor/fundamentals/design-vs-animate-mode.md"
                                                },
                                                {
                                                      text: "画板",
                                                      link: "/editor/fundamentals/artboards.md"
                                                },
                                                {
                                                      text: "组件",
                                                      link: "/editor/fundamentals/components.md"
                                                },
                                                {
                                                      text: "钢笔工具概览",
                                                      link: "/editor/fundamentals/pen-tool-overview.md"
                                                },
                                                {
                                                      text: "形状与路径概览",
                                                      link: "/editor/fundamentals/shapes-and-paths-overview.md"
                                                },
                                                {
                                                      text: "程序化形状",
                                                      link: "/editor/fundamentals/procedural-shapes.md"
                                                },
                                                {
                                                      text: "组",
                                                      link: "/editor/fundamentals/groups.md"
                                                },
                                                {
                                                      text: "选择与导航组",
                                                      link: "/editor/fundamentals/selecting-and-navigating-groups.md"
                                                },
                                                {
                                                      text: "变换空间",
                                                      link: "/editor/fundamentals/transform-spaces.md"
                                                },
                                                {
                                                      text: "组技巧",
                                                      link: "/editor/fundamentals/group-tips.md"
                                                },
                                                {
                                                      text: "填充与描边",
                                                      link: "/editor/fundamentals/fill-and-stroke.md"
                                                },
                                                {
                                                      text: "编辑顶点",
                                                      link: "/editor/fundamentals/edit-vertices.md"
                                                },
                                                {
                                                      text: "编辑顶点技巧",
                                                      link: "/editor/fundamentals/edit-vertices-tips.md"
                                                },
                                                {
                                                      text: "冻结与原点",
                                                      link: "/editor/fundamentals/freeze-and-origin.md"
                                                },
                                                {
                                                      text: "导入资源",
                                                      link: "/editor/fundamentals/importing-assets.md"
                                                },
                                                {
                                                      text: "修订历史",
                                                      link: "/editor/fundamentals/revision-history.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "操纵形状",
                                          items: [
                                                {
                                                      text: "操纵形状",
                                                      link: "/editor/manipulating-shapes/manipulating-shapes.md"
                                                },
                                                {
                                                      text: "骨骼",
                                                      link: "/editor/manipulating-shapes/bones.md"
                                                },
                                                {
                                                      text: "骨骼技巧",
                                                      link: "/editor/manipulating-shapes/bone-tips.md"
                                                },
                                                {
                                                      text: "网格",
                                                      link: "/editor/manipulating-shapes/meshes.md"
                                                },
                                                {
                                                      text: "裁剪",
                                                      link: "/editor/manipulating-shapes/clipping.md"
                                                },
                                                {
                                                      text: "独奏 (Solos)",
                                                      link: "/editor/manipulating-shapes/solos.md"
                                                },
                                                {
                                                      text: "修剪路径",
                                                      link: "/editor/manipulating-shapes/trim-path.md"
                                                },
                                                {
                                                      text: "操纵杆 (Joysticks)",
                                                      link: "/editor/manipulating-shapes/joysticks.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "文本",
                                          items: [
                                                {
                                                      text: "文本概览",
                                                      link: "/editor/text/text-overview.md"
                                                },
                                                {
                                                      text: "文本段 (Text Runs)",
                                                      link: "/editor/text/text-runs.md"
                                                },
                                                {
                                                      text: "文本样式",
                                                      link: "/editor/text/text-styles.md"
                                                },
                                                {
                                                      text: "文本修改器",
                                                      link: "/editor/text/text-modifiers.md"
                                                },
                                                {
                                                      text: "字体",
                                                      link: "/editor/text/fonts.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "约束",
                                          items: [
                                                {
                                                      text: "约束概览",
                                                      link: "/editor/constraints/constraints-overview.md"
                                                },
                                                {
                                                      text: "IK 约束",
                                                      link: "/editor/constraints/ik-constraint.md"
                                                },
                                                {
                                                      text: "距离约束",
                                                      link: "/editor/constraints/distance-constraint.md"
                                                },
                                                {
                                                      text: "缩放约束",
                                                      link: "/editor/constraints/scale-constraint.md"
                                                },
                                                {
                                                      text: "旋转约束",
                                                      link: "/editor/constraints/rotation-constraint.md"
                                                },
                                                {
                                                      text: "变换约束",
                                                      link: "/editor/constraints/transform-constraint.md"
                                                },
                                                {
                                                      text: "位移约束",
                                                      link: "/editor/constraints/translation-constraint.md"
                                                },
                                                {
                                                      text: "跟随路径约束",
                                                      link: "/editor/constraints/follow-path-constraint.md"
                                                },
                                                {
                                                      text: "滚动约束",
                                                      link: "/editor/constraints/scroll-constraint.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "动画模式",
                                          items: [
                                                {
                                                      text: "动画模式概览",
                                                      link: "/editor/animate-mode/animate-mode-overview.md"
                                                },
                                                {
                                                      text: "时间轴",
                                                      link: "/editor/animate-mode/timeline.md"
                                                },
                                                {
                                                      text: "关键帧",
                                                      link: "/editor/animate-mode/keys.md"
                                                },
                                                {
                                                      text: "动画混合",
                                                      link: "/editor/animate-mode/animation-mixing.md"
                                                },
                                                {
                                                      text: "插值与缓动",
                                                      link: "/editor/animate-mode/interpolation-easing.md"
                                                },
                                                {
                                                      text: "动画绘制顺序",
                                                      link: "/editor/animate-mode/animating-draw-order.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "状态机",
                                          items: [
                                                {
                                                      text: "状态机",
                                                      link: "/editor/state-machine/state-machine.md"
                                                },
                                                {
                                                      text: "状态",
                                                      link: "/editor/state-machine/states.md"
                                                },
                                                {
                                                      text: "输入",
                                                      link: "/editor/state-machine/inputs.md"
                                                },
                                                {
                                                      text: "过渡",
                                                      link: "/editor/state-machine/transitions.md"
                                                },
                                                {
                                                      text: "监听器",
                                                      link: "/editor/state-machine/listeners.md"
                                                },
                                                {
                                                      text: "图层",
                                                      link: "/editor/state-machine/layers.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "事件",
                                          items: [
                                                {
                                                      text: "概览",
                                                      link: "/editor/events/overview.md"
                                                },
                                                {
                                                      text: "音频事件",
                                                      link: "/editor/events/audio-events.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "数据绑定",
                                          items: [
                                                {
                                                      text: "概览",
                                                      link: "/editor/data-binding/overview.md"
                                                },
                                                {
                                                      text: "列表",
                                                      link: "/editor/data-binding/lists.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "布局",
                                          items: [
                                                {
                                                      text: "布局概览",
                                                      link: "/editor/layouts/layouts-overview.md"
                                                },
                                                {
                                                      text: "布局工具",
                                                      link: "/editor/layouts/layout-tools.md"
                                                },
                                                {
                                                      text: "布局参数",
                                                      link: "/editor/layouts/layout-parameters.md"
                                                },
                                                {
                                                      text: "布局样式",
                                                      link: "/editor/layouts/layout-styles.md"
                                                },
                                                {
                                                      text: "布局动画",
                                                      link: "/editor/layouts/layout-animation.md"
                                                },
                                                {
                                                      text: "N-Slicing",
                                                      link: "/editor/layouts/n-slicing.md"
                                                },
                                                {
                                                      text: "滚动",
                                                      link: "/editor/layouts/scrolling.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "库",
                                          link: "/editor/libraries.md"
                                    },
                                    {
                                          text: "键盘快捷键",
                                          link: "/editor/keyboard-shortcuts.md"
                                    },
                                    {
                                          text: "导出",
                                          items: [
                                                {
                                                      text: "导出为运行时",
                                                      link: "/editor/exporting/exporting-for-runtime.md"
                                                },
                                                {
                                                      text: "导出为视频与静态设计",
                                                      link: "/editor/exporting/exporting-for-video-and-static-design.md"
                                                },
                                                {
                                                      text: "导出为备份",
                                                      link: "/editor/exporting/exporting-for-backup.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "共享链接",
                                          items: [
                                                {
                                                      text: "概览",
                                                      link: "/editor/share-links/overview.md"
                                                },
                                                {
                                                      text: "Framer 与 Rive",
                                                      link: "/editor/share-links/framer-and-rive.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "MCP",
                                          items: [
                                                {
                                                      text: "集成",
                                                      link: "/editor/mcp/integration.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "标记 (Tagging)",
                                          link: "/editor/tagging.md"
                                    }
                              ],
                              collapsed: false
                        }
                  ],
                  "/scripting/": [
                        {
                              text: "脚本",
                              items: [
                                    {
                                          text: "入门指南",
                                          link: "/scripting/getting-started.md"
                                    },
                                    {
                                          text: "演示",
                                          link: "/scripting/demos.md"
                                    },
                                    {
                                          text: "创建脚本",
                                          link: "/scripting/creating-scripts.md"
                                    },
                                    {
                                          text: "协议",
                                          items: [
                                                {
                                                      text: "概览",
                                                      link: "/scripting/protocols/overview.md"
                                                },
                                                {
                                                      text: "节点脚本",
                                                      link: "/scripting/protocols/node-scripts.md"
                                                },
                                                {
                                                      text: "布局脚本",
                                                      link: "/scripting/protocols/layout-scripts.md"
                                                },
                                                {
                                                      text: "转换器脚本",
                                                      link: "/scripting/protocols/converter-scripts.md"
                                                },
                                                {
                                                      text: "路径效果脚本",
                                                      link: "/scripting/protocols/path-effect-scripts.md"
                                                },
                                                {
                                                      text: "工具脚本",
                                                      link: "/scripting/protocols/util-scripts.md"
                                                },
                                                {
                                                      text: "测试脚本",
                                                      link: "/scripting/protocols/test-scripts.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "脚本输入",
                                          link: "/scripting/script-inputs.md"
                                    },
                                    {
                                          text: "指针事件",
                                          link: "/scripting/pointer-events.md"
                                    },
                                    {
                                          text: "调试",
                                          items: [
                                                {
                                                      text: "调试面板",
                                                      link: "/scripting/debugging/debug-panel.md"
                                                },
                                                {
                                                      text: "单元测试",
                                                      link: "/scripting/debugging/unit-testing.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "AI 助手",
                                          link: "/scripting/ai-agent.md"
                                    },
                                    {
                                          text: "键盘快捷键",
                                          link: "/scripting/keyboard-shortcuts.md"
                                    },
                                    {
                                          text: "脚本 API",
                                          items: [
                                                {
                                                      text: "画板 (Artboard)",
                                                      link: "/scripting/api-reference/artboard.md"
                                                },
                                                {
                                                      text: "混合模式 (Blend Mode)",
                                                      link: "/scripting/api-reference/blend-mode.md"
                                                },
                                                {
                                                      text: "颜色 (Color)",
                                                      link: "/scripting/api-reference/color.md"
                                                },
                                                {
                                                      text: "命令类型 (Command Type)",
                                                      link: "/scripting/api-reference/command-type.md"
                                                },
                                                {
                                                      text: "上下文 (Context)",
                                                      link: "/scripting/api-reference/context.md"
                                                },
                                                {
                                                      text: "轮廓测量 (Contour Measure)",
                                                      link: "/scripting/api-reference/contour-measure.md"
                                                },
                                                {
                                                      text: "转换器 (Converter)",
                                                      link: "/scripting/api-reference/converter.md"
                                                },
                                                {
                                                      text: "数据值 (Data Value)",
                                                      link: "/scripting/api-reference/data-value.md"
                                                },
                                                {
                                                      text: "布尔数据值 (Data Value Boolean)",
                                                      link: "/scripting/api-reference/data-value-boolean.md"
                                                },
                                                {
                                                      text: "颜色数据值 (Data Value Color)",
                                                      link: "/scripting/api-reference/data-value-color.md"
                                                },
                                                {
                                                      text: "数字数据值 (Data Value Number)",
                                                      link: "/scripting/api-reference/data-value-number.md"
                                                },
                                                {
                                                      text: "字符串数据值 (Data Value String)",
                                                      link: "/scripting/api-reference/data-value-string.md"
                                                },
                                                {
                                                      text: "渐变 (Gradient)",
                                                      link: "/scripting/api-reference/gradient.md"
                                                },
                                                {
                                                      text: "渐变停止点 (Gradient Stop)",
                                                      link: "/scripting/api-reference/gradient-stop.md"
                                                },
                                                {
                                                      text: "图像 (Image)",
                                                      link: "/scripting/api-reference/image.md"
                                                },
                                                {
                                                      text: "图像滤镜 (Image Filter)",
                                                      link: "/scripting/api-reference/image-filter.md"
                                                },
                                                {
                                                      text: "图像采样器 (Image Sampler)",
                                                      link: "/scripting/api-reference/image-sampler.md"
                                                },
                                                {
                                                      text: "图像包裹 (Image Wrap)",
                                                      link: "/scripting/api-reference/image-wrap.md"
                                                },
                                                {
                                                      text: "输入 (Input)",
                                                      link: "/scripting/api-reference/input.md"
                                                },
                                                {
                                                      text: "布局 (Layout)",
                                                      link: "/scripting/api-reference/layout.md"
                                                },
                                                {
                                                      text: "监听器 (Listener)",
                                                      link: "/scripting/api-reference/listener.md"
                                                },
                                                {
                                                      text: "Mat2d",
                                                      link: "/scripting/api-reference/mat2d.md"
                                                },
                                                {
                                                      text: "节点 (Node)",
                                                      link: "/scripting/api-reference/node.md"
                                                },
                                                {
                                                      text: "节点数据 (Node Data)",
                                                      link: "/scripting/api-reference/node-data.md"
                                                },
                                                {
                                                      text: "输出 (Output)",
                                                      link: "/scripting/api-reference/output.md"
                                                },
                                                {
                                                      text: "绘制 (Paint)",
                                                      link: "/scripting/api-reference/paint.md"
                                                },
                                                {
                                                      text: "绘制定义 (Paint Definition)",
                                                      link: "/scripting/api-reference/paint-definition.md"
                                                },
                                                {
                                                      text: "绘制样式 (Paint Style)",
                                                      link: "/scripting/api-reference/paint-style.md"
                                                },
                                                {
                                                      text: "绘制类型 (Paint Type)",
                                                      link: "/scripting/api-reference/paint-type.md"
                                                },
                                                {
                                                      text: "路径 (Path)",
                                                      link: "/scripting/api-reference/path.md"
                                                },
                                                {
                                                      text: "路径命令 (Path Command)",
                                                      link: "/scripting/api-reference/path-command.md"
                                                },
                                                {
                                                      text: "路径数据 (Path Data)",
                                                      link: "/scripting/api-reference/path-data.md"
                                                },
                                                {
                                                      text: "路径效果 (Path Effect)",
                                                      link: "/scripting/api-reference/path-effect.md"
                                                },
                                                {
                                                      text: "路径测量 (Path Measure)",
                                                      link: "/scripting/api-reference/path-measure.md"
                                                },
                                                {
                                                      text: "指针事件 (Pointer Event)",
                                                      link: "/scripting/api-reference/pointer-event.md"
                                                },
                                                {
                                                      text: "属性 (Property)",
                                                      link: "/scripting/api-reference/property.md"
                                                },
                                                {
                                                      text: "属性列表 (Property List)",
                                                      link: "/scripting/api-reference/property-list.md"
                                                },
                                                {
                                                      text: "属性触发器 (Property Trigger)",
                                                      link: "/scripting/api-reference/property-trigger.md"
                                                },
                                                {
                                                      text: "渲染器 (Renderer)",
                                                      link: "/scripting/api-reference/renderer.md"
                                                },
                                                {
                                                      text: "描边末端 (Stroke Cap)",
                                                      link: "/scripting/api-reference/stroke-cap.md"
                                                },
                                                {
                                                      text: "描边连接 (Stroke Join)",
                                                      link: "/scripting/api-reference/stroke-join.md"
                                                },
                                                {
                                                      text: "触发器 (Trigger)",
                                                      link: "/scripting/api-reference/trigger.md"
                                                },
                                                {
                                                      text: "向量 (Vector)",
                                                      link: "/scripting/api-reference/vector.md"
                                                },
                                                {
                                                      text: "视图模型 (View Model)",
                                                      link: "/scripting/api-reference/view-model.md"
                                                }
                                          ],
                                          collapsed: false
                                    }
                              ],
                              collapsed: false
                        }
                  ],
                  "/runtimes/": [
                        {
                              text: "运行时基础",
                              items: [
                                    {
                                          text: "入门指南",
                                          link: "/runtimes/getting-started.md"
                                    },
                                    {
                                          text: "演示",
                                          link: "/runtimes/demos.md"
                                    },
                                    {
                                          text: "运行时大小",
                                          link: "/runtimes/runtime-sizes.md"
                                    },
                                    {
                                          text: "画板",
                                          link: "/runtimes/artboards.md"
                                    },
                                    {
                                          text: "布局",
                                          link: "/runtimes/layout.md"
                                    },
                                    {
                                          text: "状态机",
                                          link: "/runtimes/state-machines.md"
                                    },
                                    {
                                          text: "数据绑定",
                                          link: "/runtimes/data-binding.md"
                                    },
                                    {
                                          text: "加载资源",
                                          link: "/runtimes/loading-assets.md"
                                    },
                                    {
                                          text: "字体",
                                          link: "/runtimes/fonts.md"
                                    },
                                    {
                                          text: "缓存 Rive 文件",
                                          link: "/runtimes/caching-a-rive-file.md"
                                    },
                                    {
                                          text: "播放音频",
                                          link: "/runtimes/playing-audio.md"
                                    },
                                    {
                                          text: "日志",
                                          link: "/runtimes/logging.md"
                                    },
                                    {
                                          text: "选择渲染器",
                                          items: [
                                                {
                                                      text: "概览",
                                                      link: "/runtimes/choose-a-renderer/overview.md"
                                                },
                                                {
                                                      text: "常见问题",
                                                      link: "/runtimes/choose-a-renderer/faq.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "高级主题",
                                          items: [
                                                {
                                                      text: "格式",
                                                      link: "/runtimes/advanced-topic/format.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "旧版功能",
                                          items: [
                                                {
                                                      text: "动画播放",
                                                      link: "/runtimes/animation-playback.md"
                                                },
                                                {
                                                      text: "输入",
                                                      link: "/runtimes/inputs.md"
                                                },
                                                {
                                                      text: "文本",
                                                      link: "/runtimes/text.md"
                                                },
                                                {
                                                      text: "Rive 事件",
                                                      link: "/runtimes/rive-events.md"
                                                }
                                          ],
                                          collapsed: false
                                    }
                              ],
                              collapsed: false
                        },
                        {
                              text: "应用运行时",
                              items: [
                                    {
                                          text: "Web (JS)",
                                          items: [
                                                {
                                                      text: "Web (JS)",
                                                      link: "/runtimes/web/web-js.md"
                                                },
                                                {
                                                      text: "Rive 参数",
                                                      link: "/runtimes/web/rive-parameters.md"
                                                },
                                                {
                                                      text: "Canvas 与 WebGL",
                                                      link: "/runtimes/web/canvas-vs-webgl.md"
                                                },
                                                {
                                                      text: "从 Rive.js 迁移",
                                                      link: "/runtimes/web/migrating-from-rive-js.md"
                                                },
                                                {
                                                      text: "常见问题",
                                                      link: "/runtimes/web/faq.md"
                                                },
                                                {
                                                      text: "预加载 WASM",
                                                      link: "/runtimes/web/preloading-wasm.md"
                                                },
                                                {
                                                      text: "低级 API 使用",
                                                      link: "/runtimes/web/low-level-api-usage.md"
                                                },
                                                {
                                                      text: "从 V1 迁移到 V2",
                                                      link: "/runtimes/web/migrating-from-v1-to-v2.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "React",
                                          items: [
                                                {
                                                      text: "React",
                                                      link: "/runtimes/react/react.md"
                                                },
                                                {
                                                      text: "参数与返回值",
                                                      link: "/runtimes/react/parameters-and-return-values.md"
                                                },
                                                {
                                                      text: "从 V0 迁移到 V1",
                                                      link: "/runtimes/react/migrating-from-v0-to-v1.md"
                                                },
                                                {
                                                      text: "从 V1 迁移到 V3",
                                                      link: "/runtimes/react/migrating-from-v1-to-v3.md"
                                                },
                                                {
                                                      text: "从 V3 迁移到 V4",
                                                      link: "/runtimes/react/migrating-from-v3-to-v4.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "React Native",
                                          items: [
                                                {
                                                      text: "React Native",
                                                      link: "/runtimes/react-native/react-native.md"
                                                },
                                                {
                                                      text: "运行时概念",
                                                      link: "/runtimes/react-native/runtime-concepts.md"
                                                },
                                                {
                                                      text: "加载 Rive 文件",
                                                      link: "/runtimes/react-native/loading-rive-files.md"
                                                },
                                                {
                                                      text: "属性 (Props)",
                                                      link: "/runtimes/react-native/props.md"
                                                },
                                                {
                                                      text: "Rive Ref 方法",
                                                      link: "/runtimes/react-native/rive-ref-methods.md"
                                                },
                                                {
                                                      text: "错误处理",
                                                      link: "/runtimes/react-native/error-handling.md"
                                                },
                                                {
                                                      text: "将 Rive 添加到 Expo",
                                                      link: "/runtimes/react-native/adding-rive-to-expo.md"
                                                },
                                                {
                                                      text: "原生版本自定义",
                                                      link: "/runtimes/react-native/native-version-customization.md"
                                                },
                                                {
                                                      text: "迁移指南",
                                                      link: "/runtimes/react-native/migration-guide.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Flutter",
                                          items: [
                                                {
                                                      text: "Flutter",
                                                      link: "/runtimes/flutter/flutter.md"
                                                },
                                                {
                                                      text: "Rive 原生 (Native)",
                                                      link: "/runtimes/flutter/rive-native.md"
                                                },
                                                {
                                                      text: "迁移指南",
                                                      link: "/runtimes/flutter/migration-guide.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Apple",
                                          items: [
                                                {
                                                      text: "Apple",
                                                      link: "/runtimes/apple/apple.md"
                                                },
                                                {
                                                      text: "从 1.x.x 迁移到 2.x.x",
                                                      link: "/runtimes/apple/migrating-from-1.x.x-to-2.x.x.md"
                                                },
                                                {
                                                      text: "从 2.x.x 迁移到 3.x.x",
                                                      link: "/runtimes/apple/migrating-from-2.x.x-to-3.x.x.md"
                                                },
                                                {
                                                      text: "从 3.x.x 迁移到 4.x.x",
                                                      link: "/runtimes/apple/migrating-from-3.x.x-to-4.x.x.md"
                                                },
                                                {
                                                      text: "从 4.x.x 迁移到 5.x.x",
                                                      link: "/runtimes/apple/migrating-from-4.x.x-to-5.x.x.md"
                                                },
                                                {
                                                      text: "从 5.x.x 迁移到 6.x.x",
                                                      link: "/runtimes/apple/migrating-from-5.x.x-to-6.x.x.md"
                                                },
                                                {
                                                      text: "常见问题",
                                                      link: "/runtimes/apple/faq.md"
                                                },
                                                {
                                                      text: "资源使用",
                                                      link: "/runtimes/apple/resource-usage.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Android",
                                          items: [
                                                {
                                                      text: "Android",
                                                      link: "/runtimes/android/android.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "社区运行时",
                                          items: [
                                                {
                                                      text: "C# (C Sharp)",
                                                      link: "/runtimes/community-runtimes/c-sharp.md"
                                                },
                                                {
                                                      text: "Qt Quick",
                                                      link: "/runtimes/community-runtimes/qt-quick.md"
                                                }
                                          ],
                                          collapsed: false
                                    }
                              ],
                              collapsed: false
                        }
                  ],
                  "/game-runtimes/": [
                        {
                              text: "游戏运行时",
                              items: [
                                    {
                                          text: "Unreal (虚幻引擎)",
                                          items: [
                                                {
                                                      text: "Unreal 概览",
                                                      link: "/game-runtimes/unreal/unreal.md"
                                                },
                                                {
                                                      text: "入门指南",
                                                      link: "/game-runtimes/unreal/getting-started.md"
                                                },
                                                {
                                                      text: "基础知识",
                                                      link: "/game-runtimes/unreal/fundamentals.md"
                                                },
                                                {
                                                      text: "状态机",
                                                      link: "/game-runtimes/unreal/state-machines.md"
                                                },
                                                {
                                                      text: "Rive 事件",
                                                      link: "/game-runtimes/unreal/rive-events.md"
                                                },
                                                {
                                                      text: "数据绑定概览",
                                                      link: "/game-runtimes/unreal/data-binding-overview.md"
                                                },
                                                {
                                                      text: "数据绑定用法",
                                                      link: "/game-runtimes/unreal/data-binding-usage.md"
                                                },
                                                {
                                                      text: "文本",
                                                      link: "/game-runtimes/unreal/text.md"
                                                },
                                                {
                                                      text: "音频",
                                                      link: "/game-runtimes/unreal/audio.md"
                                                },
                                                {
                                                      text: "加载资源",
                                                      link: "/game-runtimes/unreal/loading-assets.md"
                                                },
                                                {
                                                      text: "运行时资源交换",
                                                      link: "/game-runtimes/unreal/runtime-asset-swapping.md"
                                                },
                                                {
                                                      text: "常用场景",
                                                      link: "/game-runtimes/unreal/common-use-cases.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Unity",
                                          items: [
                                                {
                                                      text: "Unity 概览",
                                                      link: "/game-runtimes/unity/unity.md"
                                                },
                                                {
                                                      text: "入门指南",
                                                      link: "/game-runtimes/unity/getting-started.md"
                                                },
                                                {
                                                      text: "基础知识",
                                                      link: "/game-runtimes/unity/fundamentals.md"
                                                },
                                                {
                                                      text: "组件",
                                                      link: "/game-runtimes/unity/components.md"
                                                },
                                                {
                                                      text: "布局",
                                                      link: "/game-runtimes/unity/layouts.md"
                                                },
                                                {
                                                      text: "监听器",
                                                      link: "/game-runtimes/unity/listeners.md"
                                                },
                                                {
                                                      text: "状态机",
                                                      link: "/game-runtimes/unity/state-machines.md"
                                                },
                                                {
                                                      text: "数据绑定",
                                                      link: "/game-runtimes/unity/data-binding.md"
                                                },
                                                {
                                                      text: "加载资源",
                                                      link: "/game-runtimes/unity/loading-assets.md"
                                                },
                                                {
                                                      text: "程序化渲染",
                                                      link: "/game-runtimes/unity/procedural-rendering.md"
                                                },
                                                {
                                                      text: "运行时资源交换",
                                                      link: "/game-runtimes/unity/runtime-asset-swapping.md"
                                                },
                                                {
                                                      text: "旧版",
                                                      items: [
                                                            {
                                                                  text: "输入",
                                                                  link: "/game-runtimes/unity/inputs.md"
                                                            },
                                                            {
                                                                  text: "文本",
                                                                  link: "/game-runtimes/unity/text.md"
                                                            },
                                                            {
                                                                  text: "Rive 事件",
                                                                  link: "/game-runtimes/unity/rive-events.md"
                                                            }
                                                      ],
                                                      collapsed: false
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Defold",
                                          link: "/game-runtimes/defold.md"
                                    }
                              ],
                              collapsed: false
                        }
                  ],
                  "/tutorials/": [
                        {
                              text: "教程",
                              items: [
                                    {
                                          text: "学习 Rive",
                                          link: "/tutorials/learn-rive.md"
                                    },
                                    {
                                          text: "精彩 Rive (Awesome Rive)",
                                          link: "/tutorials/awesome-rive.md"
                                    }
                              ],
                              collapsed: false
                        }
                  ]
            },

            // 社交链接
            socialLinks: [
                  { icon: 'github', link: 'https://github.com/rive-app' },
                  { icon: 'twitter', link: 'https://twitter.com/rive_app' },
                  { icon: 'discord', link: 'https://discord.com/invite/FGjmaTr' },
            ],

            // 搜索
            search: {
                  provider: 'local',
                  options: {
                        locales: {
                              zh: {
                                    translations: {
                                          button: {
                                                buttonText: '搜索文档',
                                                buttonAriaLabel: '搜索文档'
                                          },
                                          modal: {
                                                noResultsText: '无法找到相关结果',
                                                resetButtonTitle: '清除查询条件',
                                                footer: {
                                                      selectText: '选择',
                                                      navigateText: '切换'
                                                }
                                          }
                                    }
                              }
                        }
                  }
            },

            // 页脚
            footer: {
                  message: '<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023007831号-7</a> | <img src="/beian.png" style="vertical-align:middle;display:inline-block;width:16px;margin:0 2px 0 10px;" /> <a href="https://beian.mps.gov.cn/#/query/webSearch?code=11011502039362" rel="noreferrer" target="_blank">京公网安备11011502039362号</a>',
                  copyright: '版权所有 © 2024 Rive'
            },

            // 文档页脚
            docFooter: {
                  prev: '上一页',
                  next: '下一页'
            },

            // 大纲标题
            outlineTitle: '页面导航',

            // 最后更新时间文本
            lastUpdatedText: '最后更新',

            // 返回顶部
            returnToTopLabel: '返回顶部',
      },

      // Markdown 配置
      markdown: {
            lineNumbers: true,
      },
})
