import { defineConfig } from 'vitepress'

export default defineConfig({
      title: 'Rive 中文文档',
      description: 'Rive 官方文档中文版',

      // 基础路径，适配 GitHub Pages
      base: '/rivecn-docs/',

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
                                          text: "Introduction",
                                          link: "/getting-started/introduction.md"
                                    },
                                    {
                                          text: "Best Practices",
                                          link: "/getting-started/best-practices.md"
                                    },
                                    {
                                          text: "Quick Links",
                                          link: "/getting-started/quick-links.md"
                                    }
                              ],
                              collapsed: false
                        },
                        {
                              text: "社区",
                              items: [
                                    {
                                          text: "Community Overview",
                                          link: "/community/community-overview.md"
                                    },
                                    {
                                          text: "Marketplace Overview",
                                          link: "/community/marketplace-overview.md"
                                    },
                                    {
                                          text: "Rive Experts",
                                          link: "/community/rive-experts.md"
                                    }
                              ],
                              collapsed: false
                        },
                        {
                              text: "账户管理",
                              items: [
                                    {
                                          text: "Account Overview",
                                          items: [
                                                {
                                                      text: "Account Overview",
                                                      link: "/account-admin/account-overview/account-overview.md"
                                                },
                                                {
                                                      text: "Creating An Account",
                                                      link: "/account-admin/account-overview/creating-an-account.md"
                                                },
                                                {
                                                      text: "Account Management",
                                                      link: "/account-admin/account-overview/account-management.md"
                                                },
                                                {
                                                      text: "Cancel My Account",
                                                      link: "/account-admin/account-overview/cancel-my-account.md"
                                                },
                                                {
                                                      text: "Delete My Account",
                                                      link: "/account-admin/account-overview/delete-my-account.md"
                                                },
                                                {
                                                      text: "Trouble Logging In",
                                                      link: "/account-admin/account-overview/trouble-logging-in.md"
                                                },
                                                {
                                                      text: "Billing Changes",
                                                      link: "/account-admin/account-overview/billing-changes.md"
                                                },
                                                {
                                                      text: "Downloading My Receipt Or Invoice",
                                                      link: "/account-admin/account-overview/downloading-my-receipt-or-invoice.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Workspaces",
                                          items: [
                                                {
                                                      text: "Workspaces Overview",
                                                      link: "/account-admin/workspaces/workspaces-overview.md"
                                                },
                                                {
                                                      text: "Creating A Workspace",
                                                      link: "/account-admin/workspaces/creating-a-workspace.md"
                                                },
                                                {
                                                      text: "Inviting Workspace Members",
                                                      link: "/account-admin/workspaces/inviting-workspace-members.md"
                                                },
                                                {
                                                      text: "Removing Workspace Members",
                                                      link: "/account-admin/workspaces/removing-workspace-members.md"
                                                },
                                                {
                                                      text: "Reactivating A Canceled Workspace",
                                                      link: "/account-admin/workspaces/reactivating-a-canceled-workspace.md"
                                                },
                                                {
                                                      text: "Workspace Faqs",
                                                      link: "/account-admin/workspaces/workspace-faqs.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Pricing",
                                          link: "/account-admin/pricing.md"
                                    },
                                    {
                                          text: "Bring Your Own Bucket",
                                          link: "/account-admin/bring-your-own-bucket.md"
                                    }
                              ],
                              collapsed: false
                        },
                        {
                              text: "法律信息",
                              items: [
                                    {
                                          text: "Terms Of Service",
                                          link: "/legal/terms-of-service.md"
                                    },
                                    {
                                          text: "Acceptable Use Policy",
                                          link: "/legal/acceptable-use-policy.md"
                                    },
                                    {
                                          text: "Privacy Policy",
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
                                          text: "Interface Overview",
                                          items: [
                                                {
                                                      text: "Overview",
                                                      link: "/editor/interface-overview/overview.md"
                                                },
                                                {
                                                      text: "Toolbar",
                                                      link: "/editor/interface-overview/toolbar.md"
                                                },
                                                {
                                                      text: "Hierarchy",
                                                      link: "/editor/interface-overview/hierarchy.md"
                                                },
                                                {
                                                      text: "Inspector",
                                                      link: "/editor/interface-overview/inspector.md"
                                                },
                                                {
                                                      text: "Stage",
                                                      link: "/editor/interface-overview/stage.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "基础知识",
                                          items: [
                                                {
                                                      text: "Overview",
                                                      link: "/editor/fundamentals/overview.md"
                                                },
                                                {
                                                      text: "Design Vs Animate Mode",
                                                      link: "/editor/fundamentals/design-vs-animate-mode.md"
                                                },
                                                {
                                                      text: "Artboards",
                                                      link: "/editor/fundamentals/artboards.md"
                                                },
                                                {
                                                      text: "Components",
                                                      link: "/editor/fundamentals/components.md"
                                                },
                                                {
                                                      text: "Pen Tool Overview",
                                                      link: "/editor/fundamentals/pen-tool-overview.md"
                                                },
                                                {
                                                      text: "Shapes And Paths Overview",
                                                      link: "/editor/fundamentals/shapes-and-paths-overview.md"
                                                },
                                                {
                                                      text: "Procedural Shapes",
                                                      link: "/editor/fundamentals/procedural-shapes.md"
                                                },
                                                {
                                                      text: "Groups",
                                                      link: "/editor/fundamentals/groups.md"
                                                },
                                                {
                                                      text: "Selecting And Navigating Groups",
                                                      link: "/editor/fundamentals/selecting-and-navigating-groups.md"
                                                },
                                                {
                                                      text: "Transform Spaces",
                                                      link: "/editor/fundamentals/transform-spaces.md"
                                                },
                                                {
                                                      text: "Group Tips",
                                                      link: "/editor/fundamentals/group-tips.md"
                                                },
                                                {
                                                      text: "Fill And Stroke",
                                                      link: "/editor/fundamentals/fill-and-stroke.md"
                                                },
                                                {
                                                      text: "Edit Vertices",
                                                      link: "/editor/fundamentals/edit-vertices.md"
                                                },
                                                {
                                                      text: "Edit Vertices Tips",
                                                      link: "/editor/fundamentals/edit-vertices-tips.md"
                                                },
                                                {
                                                      text: "Freeze And Origin",
                                                      link: "/editor/fundamentals/freeze-and-origin.md"
                                                },
                                                {
                                                      text: "Importing Assets",
                                                      link: "/editor/fundamentals/importing-assets.md"
                                                },
                                                {
                                                      text: "Revision History",
                                                      link: "/editor/fundamentals/revision-history.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "操纵形状",
                                          items: [
                                                {
                                                      text: "Manipulating Shapes",
                                                      link: "/editor/manipulating-shapes/manipulating-shapes.md"
                                                },
                                                {
                                                      text: "Bones",
                                                      link: "/editor/manipulating-shapes/bones.md"
                                                },
                                                {
                                                      text: "Bone Tips",
                                                      link: "/editor/manipulating-shapes/bone-tips.md"
                                                },
                                                {
                                                      text: "Meshes",
                                                      link: "/editor/manipulating-shapes/meshes.md"
                                                },
                                                {
                                                      text: "Clipping",
                                                      link: "/editor/manipulating-shapes/clipping.md"
                                                },
                                                {
                                                      text: "Solos",
                                                      link: "/editor/manipulating-shapes/solos.md"
                                                },
                                                {
                                                      text: "Trim Path",
                                                      link: "/editor/manipulating-shapes/trim-path.md"
                                                },
                                                {
                                                      text: "Joysticks",
                                                      link: "/editor/manipulating-shapes/joysticks.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Text",
                                          items: [
                                                {
                                                      text: "Text Overview",
                                                      link: "/editor/text/text-overview.md"
                                                },
                                                {
                                                      text: "Text Runs",
                                                      link: "/editor/text/text-runs.md"
                                                },
                                                {
                                                      text: "Text Styles",
                                                      link: "/editor/text/text-styles.md"
                                                },
                                                {
                                                      text: "Text Modifiers",
                                                      link: "/editor/text/text-modifiers.md"
                                                },
                                                {
                                                      text: "Fonts",
                                                      link: "/editor/text/fonts.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "约束",
                                          items: [
                                                {
                                                      text: "Constraints Overview",
                                                      link: "/editor/constraints/constraints-overview.md"
                                                },
                                                {
                                                      text: "Ik Constraint",
                                                      link: "/editor/constraints/ik-constraint.md"
                                                },
                                                {
                                                      text: "Distance Constraint",
                                                      link: "/editor/constraints/distance-constraint.md"
                                                },
                                                {
                                                      text: "Scale Constraint",
                                                      link: "/editor/constraints/scale-constraint.md"
                                                },
                                                {
                                                      text: "Rotation Constraint",
                                                      link: "/editor/constraints/rotation-constraint.md"
                                                },
                                                {
                                                      text: "Transform Constraint",
                                                      link: "/editor/constraints/transform-constraint.md"
                                                },
                                                {
                                                      text: "Translation Constraint",
                                                      link: "/editor/constraints/translation-constraint.md"
                                                },
                                                {
                                                      text: "Follow Path Constraint",
                                                      link: "/editor/constraints/follow-path-constraint.md"
                                                },
                                                {
                                                      text: "Scroll Constraint",
                                                      link: "/editor/constraints/scroll-constraint.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "动画模式",
                                          items: [
                                                {
                                                      text: "Animate Mode Overview",
                                                      link: "/editor/animate-mode/animate-mode-overview.md"
                                                },
                                                {
                                                      text: "Timeline",
                                                      link: "/editor/animate-mode/timeline.md"
                                                },
                                                {
                                                      text: "Keys",
                                                      link: "/editor/animate-mode/keys.md"
                                                },
                                                {
                                                      text: "Animation Mixing",
                                                      link: "/editor/animate-mode/animation-mixing.md"
                                                },
                                                {
                                                      text: "Interpolation Easing",
                                                      link: "/editor/animate-mode/interpolation-easing.md"
                                                },
                                                {
                                                      text: "Animating Draw Order",
                                                      link: "/editor/animate-mode/animating-draw-order.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "状态机",
                                          items: [
                                                {
                                                      text: "State Machine",
                                                      link: "/editor/state-machine/state-machine.md"
                                                },
                                                {
                                                      text: "States",
                                                      link: "/editor/state-machine/states.md"
                                                },
                                                {
                                                      text: "Inputs",
                                                      link: "/editor/state-machine/inputs.md"
                                                },
                                                {
                                                      text: "Transitions",
                                                      link: "/editor/state-machine/transitions.md"
                                                },
                                                {
                                                      text: "Listeners",
                                                      link: "/editor/state-machine/listeners.md"
                                                },
                                                {
                                                      text: "Layers",
                                                      link: "/editor/state-machine/layers.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "事件",
                                          items: [
                                                {
                                                      text: "Overview",
                                                      link: "/editor/events/overview.md"
                                                },
                                                {
                                                      text: "Audio Events",
                                                      link: "/editor/events/audio-events.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "数据绑定",
                                          items: [
                                                {
                                                      text: "Overview",
                                                      link: "/editor/data-binding/overview.md"
                                                },
                                                {
                                                      text: "Lists",
                                                      link: "/editor/data-binding/lists.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "布局",
                                          items: [
                                                {
                                                      text: "Layouts Overview",
                                                      link: "/editor/layouts/layouts-overview.md"
                                                },
                                                {
                                                      text: "Layout Tools",
                                                      link: "/editor/layouts/layout-tools.md"
                                                },
                                                {
                                                      text: "Layout Parameters",
                                                      link: "/editor/layouts/layout-parameters.md"
                                                },
                                                {
                                                      text: "Layout Styles",
                                                      link: "/editor/layouts/layout-styles.md"
                                                },
                                                {
                                                      text: "Layout Animation",
                                                      link: "/editor/layouts/layout-animation.md"
                                                },
                                                {
                                                      text: "N Slicing",
                                                      link: "/editor/layouts/n-slicing.md"
                                                },
                                                {
                                                      text: "Scrolling",
                                                      link: "/editor/layouts/scrolling.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Libraries",
                                          link: "/editor/libraries.md"
                                    },
                                    {
                                          text: "Keyboard Shortcuts",
                                          link: "/editor/keyboard-shortcuts.md"
                                    },
                                    {
                                          text: "导出",
                                          items: [
                                                {
                                                      text: "Exporting For Runtime",
                                                      link: "/editor/exporting/exporting-for-runtime.md"
                                                },
                                                {
                                                      text: "Exporting For Video And Static Design",
                                                      link: "/editor/exporting/exporting-for-video-and-static-design.md"
                                                },
                                                {
                                                      text: "Exporting For Backup",
                                                      link: "/editor/exporting/exporting-for-backup.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "共享链接",
                                          items: [
                                                {
                                                      text: "Overview",
                                                      link: "/editor/share-links/overview.md"
                                                },
                                                {
                                                      text: "Framer And Rive",
                                                      link: "/editor/share-links/framer-and-rive.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "MCP",
                                          items: [
                                                {
                                                      text: "Integration",
                                                      link: "/editor/mcp/integration.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Tagging",
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
                                          text: "Getting Started",
                                          link: "/scripting/getting-started.md"
                                    },
                                    {
                                          text: "Demos",
                                          link: "/scripting/demos.md"
                                    },
                                    {
                                          text: "Creating Scripts",
                                          link: "/scripting/creating-scripts.md"
                                    },
                                    {
                                          text: "协议",
                                          items: [
                                                {
                                                      text: "Overview",
                                                      link: "/scripting/protocols/overview.md"
                                                },
                                                {
                                                      text: "Node Scripts",
                                                      link: "/scripting/protocols/node-scripts.md"
                                                },
                                                {
                                                      text: "Layout Scripts",
                                                      link: "/scripting/protocols/layout-scripts.md"
                                                },
                                                {
                                                      text: "Converter Scripts",
                                                      link: "/scripting/protocols/converter-scripts.md"
                                                },
                                                {
                                                      text: "Path Effect Scripts",
                                                      link: "/scripting/protocols/path-effect-scripts.md"
                                                },
                                                {
                                                      text: "Util Scripts",
                                                      link: "/scripting/protocols/util-scripts.md"
                                                },
                                                {
                                                      text: "Test Scripts",
                                                      link: "/scripting/protocols/test-scripts.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Script Inputs",
                                          link: "/scripting/script-inputs.md"
                                    },
                                    {
                                          text: "Pointer Events",
                                          link: "/scripting/pointer-events.md"
                                    },
                                    {
                                          text: "调试",
                                          items: [
                                                {
                                                      text: "Debug Panel",
                                                      link: "/scripting/debugging/debug-panel.md"
                                                },
                                                {
                                                      text: "Unit Testing",
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
                                          text: "Keyboard Shortcuts",
                                          link: "/scripting/keyboard-shortcuts.md"
                                    },
                                    {
                                          text: "脚本 API",
                                          items: [
                                                {
                                                      text: "Artboard",
                                                      link: "/scripting/api-reference/artboard.md"
                                                },
                                                {
                                                      text: "Blend Mode",
                                                      link: "/scripting/api-reference/blend-mode.md"
                                                },
                                                {
                                                      text: "Color",
                                                      link: "/scripting/api-reference/color.md"
                                                },
                                                {
                                                      text: "Command Type",
                                                      link: "/scripting/api-reference/command-type.md"
                                                },
                                                {
                                                      text: "Context",
                                                      link: "/scripting/api-reference/context.md"
                                                },
                                                {
                                                      text: "Contour Measure",
                                                      link: "/scripting/api-reference/contour-measure.md"
                                                },
                                                {
                                                      text: "Converter",
                                                      link: "/scripting/api-reference/converter.md"
                                                },
                                                {
                                                      text: "Data Value",
                                                      link: "/scripting/api-reference/data-value.md"
                                                },
                                                {
                                                      text: "Data Value Boolean",
                                                      link: "/scripting/api-reference/data-value-boolean.md"
                                                },
                                                {
                                                      text: "Data Value Color",
                                                      link: "/scripting/api-reference/data-value-color.md"
                                                },
                                                {
                                                      text: "Data Value Number",
                                                      link: "/scripting/api-reference/data-value-number.md"
                                                },
                                                {
                                                      text: "Data Value String",
                                                      link: "/scripting/api-reference/data-value-string.md"
                                                },
                                                {
                                                      text: "Gradient",
                                                      link: "/scripting/api-reference/gradient.md"
                                                },
                                                {
                                                      text: "Gradient Stop",
                                                      link: "/scripting/api-reference/gradient-stop.md"
                                                },
                                                {
                                                      text: "Image",
                                                      link: "/scripting/api-reference/image.md"
                                                },
                                                {
                                                      text: "Image Filter",
                                                      link: "/scripting/api-reference/image-filter.md"
                                                },
                                                {
                                                      text: "Image Sampler",
                                                      link: "/scripting/api-reference/image-sampler.md"
                                                },
                                                {
                                                      text: "Image Wrap",
                                                      link: "/scripting/api-reference/image-wrap.md"
                                                },
                                                {
                                                      text: "Input",
                                                      link: "/scripting/api-reference/input.md"
                                                },
                                                {
                                                      text: "Layout",
                                                      link: "/scripting/api-reference/layout.md"
                                                },
                                                {
                                                      text: "Listener",
                                                      link: "/scripting/api-reference/listener.md"
                                                },
                                                {
                                                      text: "Mat2d",
                                                      link: "/scripting/api-reference/mat2d.md"
                                                },
                                                {
                                                      text: "Node",
                                                      link: "/scripting/api-reference/node.md"
                                                },
                                                {
                                                      text: "Node Data",
                                                      link: "/scripting/api-reference/node-data.md"
                                                },
                                                {
                                                      text: "Output",
                                                      link: "/scripting/api-reference/output.md"
                                                },
                                                {
                                                      text: "Paint",
                                                      link: "/scripting/api-reference/paint.md"
                                                },
                                                {
                                                      text: "Paint Definition",
                                                      link: "/scripting/api-reference/paint-definition.md"
                                                },
                                                {
                                                      text: "Paint Style",
                                                      link: "/scripting/api-reference/paint-style.md"
                                                },
                                                {
                                                      text: "Paint Type",
                                                      link: "/scripting/api-reference/paint-type.md"
                                                },
                                                {
                                                      text: "Path",
                                                      link: "/scripting/api-reference/path.md"
                                                },
                                                {
                                                      text: "Path Command",
                                                      link: "/scripting/api-reference/path-command.md"
                                                },
                                                {
                                                      text: "Path Data",
                                                      link: "/scripting/api-reference/path-data.md"
                                                },
                                                {
                                                      text: "Path Effect",
                                                      link: "/scripting/api-reference/path-effect.md"
                                                },
                                                {
                                                      text: "Path Measure",
                                                      link: "/scripting/api-reference/path-measure.md"
                                                },
                                                {
                                                      text: "Pointer Event",
                                                      link: "/scripting/api-reference/pointer-event.md"
                                                },
                                                {
                                                      text: "Property",
                                                      link: "/scripting/api-reference/property.md"
                                                },
                                                {
                                                      text: "Property List",
                                                      link: "/scripting/api-reference/property-list.md"
                                                },
                                                {
                                                      text: "Property Trigger",
                                                      link: "/scripting/api-reference/property-trigger.md"
                                                },
                                                {
                                                      text: "Renderer",
                                                      link: "/scripting/api-reference/renderer.md"
                                                },
                                                {
                                                      text: "Stroke Cap",
                                                      link: "/scripting/api-reference/stroke-cap.md"
                                                },
                                                {
                                                      text: "Stroke Join",
                                                      link: "/scripting/api-reference/stroke-join.md"
                                                },
                                                {
                                                      text: "Trigger",
                                                      link: "/scripting/api-reference/trigger.md"
                                                },
                                                {
                                                      text: "Vector",
                                                      link: "/scripting/api-reference/vector.md"
                                                },
                                                {
                                                      text: "View Model",
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
                                          text: "Getting Started",
                                          link: "/runtimes/getting-started.md"
                                    },
                                    {
                                          text: "Demos",
                                          link: "/runtimes/demos.md"
                                    },
                                    {
                                          text: "Runtime Sizes",
                                          link: "/runtimes/runtime-sizes.md"
                                    },
                                    {
                                          text: "Artboards",
                                          link: "/runtimes/artboards.md"
                                    },
                                    {
                                          text: "Layout",
                                          link: "/runtimes/layout.md"
                                    },
                                    {
                                          text: "State Machines",
                                          link: "/runtimes/state-machines.md"
                                    },
                                    {
                                          text: "Data Binding",
                                          link: "/runtimes/data-binding.md"
                                    },
                                    {
                                          text: "Loading Assets",
                                          link: "/runtimes/loading-assets.md"
                                    },
                                    {
                                          text: "Fonts",
                                          link: "/runtimes/fonts.md"
                                    },
                                    {
                                          text: "Caching A Rive File",
                                          link: "/runtimes/caching-a-rive-file.md"
                                    },
                                    {
                                          text: "Playing Audio",
                                          link: "/runtimes/playing-audio.md"
                                    },
                                    {
                                          text: "Logging",
                                          link: "/runtimes/logging.md"
                                    },
                                    {
                                          text: "Choose a Renderer",
                                          items: [
                                                {
                                                      text: "Overview",
                                                      link: "/runtimes/choose-a-renderer/overview.md"
                                                },
                                                {
                                                      text: "Faq",
                                                      link: "/runtimes/choose-a-renderer/faq.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "高级主题",
                                          items: [
                                                {
                                                      text: "Format",
                                                      link: "/runtimes/advanced-topic/format.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "旧版功能",
                                          items: [
                                                {
                                                      text: "Animation Playback",
                                                      link: "/runtimes/animation-playback.md"
                                                },
                                                {
                                                      text: "Inputs",
                                                      link: "/runtimes/inputs.md"
                                                },
                                                {
                                                      text: "Text",
                                                      link: "/runtimes/text.md"
                                                },
                                                {
                                                      text: "Rive Events",
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
                                                      text: "Web Js",
                                                      link: "/runtimes/web/web-js.md"
                                                },
                                                {
                                                      text: "Rive Parameters",
                                                      link: "/runtimes/web/rive-parameters.md"
                                                },
                                                {
                                                      text: "Canvas Vs Webgl",
                                                      link: "/runtimes/web/canvas-vs-webgl.md"
                                                },
                                                {
                                                      text: "Migrating From Rive Js",
                                                      link: "/runtimes/web/migrating-from-rive-js.md"
                                                },
                                                {
                                                      text: "Faq",
                                                      link: "/runtimes/web/faq.md"
                                                },
                                                {
                                                      text: "Preloading Wasm",
                                                      link: "/runtimes/web/preloading-wasm.md"
                                                },
                                                {
                                                      text: "Low Level Api Usage",
                                                      link: "/runtimes/web/low-level-api-usage.md"
                                                },
                                                {
                                                      text: "Migrating From V1 To V2",
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
                                                      text: "Parameters And Return Values",
                                                      link: "/runtimes/react/parameters-and-return-values.md"
                                                },
                                                {
                                                      text: "Migrating From V0 To V1",
                                                      link: "/runtimes/react/migrating-from-v0-to-v1.md"
                                                },
                                                {
                                                      text: "Migrating From V1 To V3",
                                                      link: "/runtimes/react/migrating-from-v1-to-v3.md"
                                                },
                                                {
                                                      text: "Migrating From V3 To V4",
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
                                                      text: "Runtime Concepts",
                                                      link: "/runtimes/react-native/runtime-concepts.md"
                                                },
                                                {
                                                      text: "Loading Rive Files",
                                                      link: "/runtimes/react-native/loading-rive-files.md"
                                                },
                                                {
                                                      text: "Props",
                                                      link: "/runtimes/react-native/props.md"
                                                },
                                                {
                                                      text: "Rive Ref Methods",
                                                      link: "/runtimes/react-native/rive-ref-methods.md"
                                                },
                                                {
                                                      text: "Error Handling",
                                                      link: "/runtimes/react-native/error-handling.md"
                                                },
                                                {
                                                      text: "Adding Rive To Expo",
                                                      link: "/runtimes/react-native/adding-rive-to-expo.md"
                                                },
                                                {
                                                      text: "Native Version Customization",
                                                      link: "/runtimes/react-native/native-version-customization.md"
                                                },
                                                {
                                                      text: "Migration Guide",
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
                                                      text: "Rive Native",
                                                      link: "/runtimes/flutter/rive-native.md"
                                                },
                                                {
                                                      text: "Migration Guide",
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
                                                      text: "Migrating From 1.x.x To 2.x.x",
                                                      link: "/runtimes/apple/migrating-from-1.x.x-to-2.x.x.md"
                                                },
                                                {
                                                      text: "Migrating From 2.x.x To 3.x.x",
                                                      link: "/runtimes/apple/migrating-from-2.x.x-to-3.x.x.md"
                                                },
                                                {
                                                      text: "Migrating From 3.x.x To 4.x.x",
                                                      link: "/runtimes/apple/migrating-from-3.x.x-to-4.x.x.md"
                                                },
                                                {
                                                      text: "Migrating From 4.x.x To 5.x.x",
                                                      link: "/runtimes/apple/migrating-from-4.x.x-to-5.x.x.md"
                                                },
                                                {
                                                      text: "Migrating From 5.x.x To 6.x.x",
                                                      link: "/runtimes/apple/migrating-from-5.x.x-to-6.x.x.md"
                                                },
                                                {
                                                      text: "Faq",
                                                      link: "/runtimes/apple/faq.md"
                                                },
                                                {
                                                      text: "Resource Usage",
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
                                          text: "Community Runtimes",
                                          items: [
                                                {
                                                      text: "C Sharp",
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
                                          text: "Unreal",
                                          items: [
                                                {
                                                      text: "Unreal",
                                                      link: "/game-runtimes/unreal/unreal.md"
                                                },
                                                {
                                                      text: "Getting Started",
                                                      link: "/game-runtimes/unreal/getting-started.md"
                                                },
                                                {
                                                      text: "Fundamentals",
                                                      link: "/game-runtimes/unreal/fundamentals.md"
                                                },
                                                {
                                                      text: "State Machines",
                                                      link: "/game-runtimes/unreal/state-machines.md"
                                                },
                                                {
                                                      text: "Rive Events",
                                                      link: "/game-runtimes/unreal/rive-events.md"
                                                },
                                                {
                                                      text: "Data Binding Overview",
                                                      link: "/game-runtimes/unreal/data-binding-overview.md"
                                                },
                                                {
                                                      text: "Data Binding Usage",
                                                      link: "/game-runtimes/unreal/data-binding-usage.md"
                                                },
                                                {
                                                      text: "Text",
                                                      link: "/game-runtimes/unreal/text.md"
                                                },
                                                {
                                                      text: "Audio",
                                                      link: "/game-runtimes/unreal/audio.md"
                                                },
                                                {
                                                      text: "Loading Assets",
                                                      link: "/game-runtimes/unreal/loading-assets.md"
                                                },
                                                {
                                                      text: "Runtime Asset Swapping",
                                                      link: "/game-runtimes/unreal/runtime-asset-swapping.md"
                                                },
                                                {
                                                      text: "Common Use Cases",
                                                      link: "/game-runtimes/unreal/common-use-cases.md"
                                                }
                                          ],
                                          collapsed: false
                                    },
                                    {
                                          text: "Unity",
                                          items: [
                                                {
                                                      text: "Unity",
                                                      link: "/game-runtimes/unity/unity.md"
                                                },
                                                {
                                                      text: "Getting Started",
                                                      link: "/game-runtimes/unity/getting-started.md"
                                                },
                                                {
                                                      text: "Fundamentals",
                                                      link: "/game-runtimes/unity/fundamentals.md"
                                                },
                                                {
                                                      text: "Components",
                                                      link: "/game-runtimes/unity/components.md"
                                                },
                                                {
                                                      text: "Layouts",
                                                      link: "/game-runtimes/unity/layouts.md"
                                                },
                                                {
                                                      text: "Listeners",
                                                      link: "/game-runtimes/unity/listeners.md"
                                                },
                                                {
                                                      text: "State Machines",
                                                      link: "/game-runtimes/unity/state-machines.md"
                                                },
                                                {
                                                      text: "Data Binding",
                                                      link: "/game-runtimes/unity/data-binding.md"
                                                },
                                                {
                                                      text: "Loading Assets",
                                                      link: "/game-runtimes/unity/loading-assets.md"
                                                },
                                                {
                                                      text: "Procedural Rendering",
                                                      link: "/game-runtimes/unity/procedural-rendering.md"
                                                },
                                                {
                                                      text: "Runtime Asset Swapping",
                                                      link: "/game-runtimes/unity/runtime-asset-swapping.md"
                                                },
                                                {
                                                      text: "Legacy",
                                                      items: [
                                                            {
                                                                  text: "Inputs",
                                                                  link: "/game-runtimes/unity/inputs.md"
                                                            },
                                                            {
                                                                  text: "Text",
                                                                  link: "/game-runtimes/unity/text.md"
                                                            },
                                                            {
                                                                  text: "Rive Events",
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
                                          text: "Learn Rive",
                                          link: "/tutorials/learn-rive.md"
                                    },
                                    {
                                          text: "Awesome Rive",
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
                  message: 'Released under the MIT License.',
                  copyright: 'Copyright © 2024 Rive'
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
