import plotly.graph_objects as go

# Define the flowchart data with proper positioning
nodes = [
    {"id": "coffee_gum", "label": "Coffee_Gum<br>Private Repo", "y": 4, "x": 0, 
     "description": "Markdown files, HJ folder structure, Data management"},
    {"id": "dwawawawa_repo", "label": "Dwawawawa<br>Public Repo", "y": 3, "x": 0,
     "description": "HTML, CSS, JS files, Wiki web app, GitHub API integration"},
    {"id": "github_pages", "label": "GitHub Pages<br>Service", "y": 2, "x": 0,
     "description": "Auto build & deploy, CDN service, HTTPS applied"},
    {"id": "website", "label": "Coffee_Gum Wiki<br>Website", "y": 1, "x": 0,
     "description": "https://dwawawawa.github.io, Wiki interface, Markdown rendering"}
]

connections = [
    {"from": (0, 4), "to": (0, 3), "label": "GitHub API<br>Data Link", "mid_y": 3.5},
    {"from": (0, 3), "to": (0, 2), "label": "Git Push<br>Auto Trigger", "mid_y": 2.5},
    {"from": (0, 2), "to": (0, 1), "label": "Deploy &<br>Hosting", "mid_y": 1.5}
]

# Create the figure
fig = go.Figure()

# Add connection lines with arrows
for i, conn in enumerate(connections):
    # Add line
    fig.add_trace(go.Scatter(
        x=[conn["from"][0], conn["to"][0]], 
        y=[conn["from"][1], conn["to"][1]],
        mode='lines',
        line=dict(color='#5D878F', width=4),
        showlegend=False,
        hoverinfo='skip',
        cliponaxis=False
    ))
    
    # Add arrow head (larger and more prominent)
    fig.add_trace(go.Scatter(
        x=[conn["to"][0]], 
        y=[conn["to"][1] + 0.15],
        mode='markers',
        marker=dict(symbol='triangle-down', size=20, color='#5D878F'),
        showlegend=False,
        hoverinfo='skip',
        cliponaxis=False
    ))
    
    # Add connection labels
    fig.add_trace(go.Scatter(
        x=[0.3], 
        y=[conn["mid_y"]],
        mode='text',
        text=conn["label"],
        textposition="middle center",
        textfont=dict(size=10, color='#5D878F'),
        showlegend=False,
        hoverinfo='skip',
        cliponaxis=False
    ))

# Add nodes with different colors
colors = ['#1FB8CD', '#FFC185', '#ECEBD5', '#D2BA4C']
for i, node in enumerate(nodes):
    fig.add_trace(go.Scatter(
        x=[node["x"]], 
        y=[node["y"]],
        mode='markers+text',
        marker=dict(size=90, color=colors[i], line=dict(width=3, color='white')),
        text=node["label"],
        textposition="middle center",
        textfont=dict(size=11, color='black', family="Arial Black"),
        showlegend=False,
        hoverinfo='text',
        hovertext=f"<b>{node['label'].replace('<br>', ' ')}</b><br>{node['description']}",
        cliponaxis=False
    ))

# Add descriptions below each node
descriptions = [
    "Markdown storage<br>HJ folder structure<br>Data management",
    "HTML, CSS, JS files<br>Wiki web app<br>GitHub API connect",
    "Auto build & deploy<br>CDN service<br>HTTPS applied",
    "dwawawawa.github.io<br>Wiki interface<br>Markdown render"
]

for i, (node, desc) in enumerate(zip(nodes, descriptions)):
    fig.add_trace(go.Scatter(
        x=[node["x"]], 
        y=[node["y"] - 0.3],
        mode='text',
        text=desc,
        textposition="middle center",
        textfont=dict(size=8, color='#333333'),
        showlegend=False,
        hoverinfo='skip',
        cliponaxis=False
    ))

# Update layout
fig.update_layout(
    title="GitHub Pages Deploy Flow",
    xaxis=dict(showgrid=False, zeroline=False, showticklabels=False, range=[-0.8, 0.8]),
    yaxis=dict(showgrid=False, zeroline=False, showticklabels=False, range=[0.3, 4.7]),
    plot_bgcolor='rgba(0,0,0,0)'
)

fig.update_xaxes(title="")
fig.update_yaxes(title="")

# Save the chart
fig.write_image("github_pages_flowchart.png")