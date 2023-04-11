import os 
import json
import svgwrite

# load data from json file
with open('study3_raw_sketches.json') as f:
    data = json.load(f)

# Now let's do svg
sketches_path = os.path.abspath(os.path.join('Sketches/Sketches_svg'))
if os.path.isdir(sketches_path) == False:
    os.mkdir(sketches_path)

# Create metadata about participant and sound ids
participantIDs = list(data.keys())
metadata = {
    'participantIDs': participantIDs,
    'soundIDs': list(data[participantIDs[0]].keys()) 
}
# Save metadata as json
with open(sketches_path + '/data.json', 'w') as f:
    json.dump(metadata, f)

# Save as vector graphics
for pt in data:
    pt_path = sketches_path + '/' + pt
    if os.path.isdir(pt_path) == False:
        os.mkdir(pt_path)
    for key in data[pt]:
        # Remove drawingInterface prefix from soundName
        taskName = key

        # if 'sketch' in data[pt][key]:
        #     sketch = data[pt][key]['sketch']
        # else:
        #     sketch = [[[0], [0], [0]]]

        sketch = data[pt][key]

        if len(sketch[0][0]) == 0:
            sketch = [[[0], [0], [0]]]

        # Create SVG
        # Get bounding box of svg which will its size, but don't consider dots ouside of canvas (which happens sometimes in the top left corner for some reason)
        minX = min(map(min, [stroke[0] for stroke in sketch if len(stroke[0]) > 1 or len(
            sketch) == 1 or (stroke[0][0] > 0 and stroke[1][0] > 0)]))
        maxX = max(map(max, [stroke[0] for stroke in sketch if len(stroke[0]) > 1 or len(
            sketch) == 1 or (stroke[0][0] > 0 and stroke[1][0] > 0)]))
        minY = min(map(min, [stroke[1] for stroke in sketch if len(stroke[0]) > 1 or len(
            sketch) == 1 or (stroke[0][0] > 0 and stroke[1][0] > 0)]))
        maxY = max(map(max, [stroke[1] for stroke in sketch if len(stroke[0]) > 1 or len(
            sketch) == 1 or (stroke[0][0] > 0 and stroke[1][0] > 0)]))

        # Use to make svgs square shaped
        side = max(maxX-minX, maxY-minY)
        X = maxX-minX
        Y = maxY-minY

        svg = svgwrite.Drawing('{}/{}.svg'.format(pt_path, taskName),
                                profile='tiny', size=(X, Y), viewBox=("-3 -3 {} {}".format(X, Y)))
        path = ''
        for stroke in sketch:
            stroke_len = len(stroke[0])
            if stroke_len > 1:
                path += 'M{} {} '.format(stroke[0]
                                            [0]-minX, stroke[1][0]-minY)
                for x, y in zip(stroke[0][1:], stroke[1][1:]):
                    path += 'L{} {} '.format(x-minX, y-minY)

                svg.add(svg.path(path, fill='none', stroke='black'))
            elif stroke[0][0] > 0 and stroke[1][0] > 0:
                svg.add(svg.circle(
                    (stroke[0][0]-minX, stroke[1][0]-minY), 1, fill='black'))

            svg.save()
