@echo off
echo Fixing SDLC image file names...
echo.

cd /d "%~dp0"

if exist "sdlc-complete-flow.png.png" (
    ren "sdlc-complete-flow.png.png" "sdlc-complete-flow.png"
    echo Fixed: sdlc-complete-flow.png
)

if exist "requirement-gathering-phase.png.png" (
    ren "requirement-gathering-phase.png.png" "requirement-gathering-phase.png"
    echo Fixed: requirement-gathering-phase.png
)

if exist "feasibility-study-phase.png.png" (
    ren "feasibility-study-phase.png.png" "feasibility-study-phase.png"
    echo Fixed: feasibility-study-phase.png
)

if exist "system-design-phase.png.png" (
    ren "system-design-phase.png.png" "system-design-phase.png"
    echo Fixed: system-design-phase.png
)

if exist "hostel-booking-architecture.png.png" (
    ren "hostel-booking-architecture.png.png" "hostel-booking-architecture.png"
    echo Fixed: hostel-booking-architecture.png
)

if exist "development-phase.png.png" (
    ren "development-phase.png.png" "development-phase.png"
    echo Fixed: development-phase.png
)

if exist "testing-phase.png.png" (
    ren "testing-phase.png.png" "testing-phase.png"
    echo Fixed: testing-phase.png
)

if exist "deployment-phase.png.png" (
    ren "deployment-phase.png.png" "deployment-phase.png"
    echo Fixed: deployment-phase.png
)

if exist "cicd-pipeline-flow.png.png" (
    ren "cicd-pipeline-flow.png.png" "cicd-pipeline-flow.png"
    echo Fixed: cicd-pipeline-flow.png
)

if exist "maintenance-phase.png.png" (
    ren "maintenance-phase.png.png" "maintenance-phase.png"
    echo Fixed: maintenance-phase.png
)

if exist "sdlc-models-comparison.png.png" (
    ren "sdlc-models-comparison.png.png" "sdlc-models-comparison.png"
    echo Fixed: sdlc-models-comparison.png
)

if exist "waterfall-model.png.png" (
    ren "waterfall-model.png.png" "waterfall-model.png"
    echo Fixed: waterfall-model.png
)

if exist "agile-model.png.png" (
    ren "agile-model.png.png" "agile-model.png"
    echo Fixed: agile-model.png
)

if exist "v-model.png.png" (
    ren "v-model.png.png" "v-model.png"
    echo Fixed: v-model.png
)

if exist "spiral-model.png.png" (
    ren "spiral-model.png.png" "spiral-model.png"
    echo Fixed: spiral-model.png
)

if exist "sdlc-roles.png.png" (
    ren "sdlc-roles.png.png" "sdlc-roles.png"
    echo Fixed: sdlc-roles.png
)

if exist "secure-sdlc.png.png" (
    ren "secure-sdlc.png.png" "secure-sdlc.png"
    echo Fixed: secure-sdlc.png
)

if exist "modern-sdlc-workflow.png.png" (
    ren "modern-sdlc-workflow.png.png" "modern-sdlc-workflow.png"
    echo Fixed: modern-sdlc-workflow.png
)

echo.
echo Done! All image files have been fixed.
echo.
pause

